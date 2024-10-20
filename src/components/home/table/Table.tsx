"use client";
import React, {
  useMemo,
  useEffect,
  useState
} from "react";
import { useSearchParams } from 'next/navigation';

// types
import { Task } from "@/providers/task/Task.reducer";
import List from "./List";

interface TableProps {
  data?: Task[];
  loading: boolean;
}

const TableComponent: React.FC<TableProps> = ({ data, loading }) => {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState('')
  useEffect(() => {
    const typeParam = searchParams?.get('filter');
    setFilter(typeParam ? typeParam : '')
  }, [searchParams]);

  const filteredData = useMemo(() => {
    if (filter && filter != 'All') {
      return data?.filter((i) => String(i?.project)?.toLowerCase() == filter?.toLowerCase());
    } else {
      return data;
    }
  }, [data, filter])

  return (
    <List data={filteredData} loading={loading} filter={filter} />
  );
};

export default TableComponent;
