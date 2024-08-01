"use client";
import React from "react";
import { useFiltersContext } from "@/context/use-filters-context";
import { type Project } from "@prisma/client";
import { EpicFilter } from "@/components/filter-epic";
import { IssueTypeFilter } from "@/components/filter-issue-type";
import { SearchBar } from "@/components/filter-search-bar";
import { Members } from "../members";
import { ClearFilters } from "../filter-issue-clear";
import { SprintFilter } from "../filter-sprint";
import { NotImplemented } from "../not-implemented";
import { Button } from "../ui/button";
import { BiLineChart } from "react-icons/bi";
import { QuickFilter } from "@/components/filter-quick";

const BoardHeader: React.FC<{ project: Project }> = ({ project }) => {
  const { search, setSearch } = useFiltersContext();
  return (
    <div className="flex h-fit flex-col">
      <div className="text-sm text-gray-500 dark:text-gray-400">Projects / {project.name}</div>
      <h1 className="dark:text-gray-300">Active sprints </h1>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <SearchBar search={search} setSearch={setSearch} />
          <Members />
          <EpicFilter />
          <IssueTypeFilter />
          <SprintFilter />
          <QuickFilter />
          <ClearFilters />
        </div>
        <NotImplemented feature="insights">
          <Button className="px-2 flex items-center gap-x-2 dark:border-gray-900 dark:bg-gray-700  dark:bg-opacity-60">
            <BiLineChart className="text-gray-900 dark:text-gray-300" />
            <span className="text-sm text-gray-900 dark:text-gray-300">Insights</span>
          </Button>
        </NotImplemented>
      </div>
    </div>
  );
};

export { BoardHeader };
