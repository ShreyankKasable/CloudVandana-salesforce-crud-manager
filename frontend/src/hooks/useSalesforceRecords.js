import { useCallback, useEffect, useState } from "react";
import { getSalesforceFields, getSalesforceRecords } from "../services/salesforceApi";

const useSalesforceRecords = (objectName) => {
  const [fields, setFields] = useState([]);
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ hasMore: false, nextPage: null });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadFirstPage = useCallback(async () => {
    setLoading(true);
    setError(null);
    setFields([]);
    setRecords([]);
    setPagination({ hasMore: false, nextPage: null });
    try {
      const [metadata, firstPage] = await Promise.all([
        getSalesforceFields(objectName),
        getSalesforceRecords(objectName, 1),
      ]);
      setFields(metadata.fields || []);
      setRecords(firstPage.records || []);
      setPagination(firstPage.pagination || { hasMore: false, nextPage: null });
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, [objectName]);

  useEffect(() => { loadFirstPage(); }, [loadFirstPage]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !pagination.hasMore || !pagination.nextPage) return;
    setLoadingMore(true);
    try {
      const nextPage = await getSalesforceRecords(objectName, pagination.nextPage);
      setRecords((current) => [...current, ...(nextPage.records || [])]);
      setPagination(nextPage.pagination || { hasMore: false, nextPage: null });
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, objectName, pagination]);

  return { fields, records, pagination, loading, loadingMore, error, reload: loadFirstPage, loadMore };
};

export default useSalesforceRecords;
