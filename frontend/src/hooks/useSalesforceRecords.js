import { useCallback, useEffect, useRef, useState } from "react";
import { getSalesforceFields, getSalesforceRecords } from "../services/salesforceApi";

const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 20,
  hasMore: false,
  nextPage: null,
};

const useSalesforceRecords = (objectName) => {
  const requestIdRef = useRef(0);
  const loadingMoreRef = useRef(false);
  const [loadedObjectName, setLoadedObjectName] = useState(objectName);
  const [fields, setFields] = useState([]);
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [loading, setLoading] = useState(true);
  const [metadataLoading, setMetadataLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadFirstPage = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    loadingMoreRef.current = false;

    setLoadedObjectName(objectName);
    setLoading(true);
    setMetadataLoading(true);
    setRecordsLoading(true);
    setLoadingMore(false);
    setError(null);
    setFields([]);
    setRecords([]);
    setPagination(DEFAULT_PAGINATION);

    try {
      const [metadata, firstPage] = await Promise.all([
        getSalesforceFields(objectName),
        getSalesforceRecords(objectName, 1),
      ]);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setFields(metadata.fields || []);
      setRecords(firstPage.records || []);
      setPagination(firstPage.pagination || DEFAULT_PAGINATION);
    } catch (requestError) {
      if (requestId === requestIdRef.current) {
        setError(requestError);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setMetadataLoading(false);
        setRecordsLoading(false);
      }
    }
  }, [objectName]);

  useEffect(() => {
    let shouldLoad = true;

    Promise.resolve().then(() => {
      if (shouldLoad) {
        loadFirstPage();
      }
    });

    return () => {
      shouldLoad = false;
    };
  }, [loadFirstPage]);

  const loadMore = useCallback(async () => {
    if (
      loadedObjectName !== objectName ||
      loading ||
      loadingMoreRef.current ||
      !pagination.hasMore ||
      !pagination.nextPage
    ) {
      return;
    }

    const requestId = requestIdRef.current;
    const pageToLoad = pagination.nextPage;

    loadingMoreRef.current = true;
    setLoadingMore(true);
    setError(null);

    try {
      const nextPage = await getSalesforceRecords(objectName, pageToLoad);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setRecords((current) => [...current, ...(nextPage.records || [])]);
      setPagination(nextPage.pagination || DEFAULT_PAGINATION);
    } catch (requestError) {
      if (requestId === requestIdRef.current) {
        setError(requestError);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoadingMore(false);
        loadingMoreRef.current = false;
      }
    }
  }, [loadedObjectName, loading, objectName, pagination.hasMore, pagination.nextPage]);

  const isCurrentObject = loadedObjectName === objectName;

  return {
    fields: isCurrentObject ? fields : [],
    records: isCurrentObject ? records : [],
    pagination: isCurrentObject ? pagination : DEFAULT_PAGINATION,
    loading: !isCurrentObject || loading,
    metadataLoading: !isCurrentObject || metadataLoading,
    recordsLoading: !isCurrentObject || recordsLoading,
    loadingMore: isCurrentObject && loadingMore,
    error: isCurrentObject ? error : null,
    reload: loadFirstPage,
    loadMore,
  };
};

export default useSalesforceRecords;
