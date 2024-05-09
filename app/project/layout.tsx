"use client";
import { Sidebar } from "@/components/sidebar";
import { TopNavbar } from "@/components/top-navbar";
import { FiltersProvider } from "@/context/use-filters-context";
import { Fragment } from "react";
import { ThemeProvider } from "next-themes";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <Fragment>
        <TopNavbar />
        <main className="flex h-[calc(100vh_-_3rem)] w-full">
          <Sidebar />
          <FiltersProvider>
            <div className="w-full max-w-[calc(100vw_-_16rem)]">{children}</div>
          </FiltersProvider>
        </main>
      </Fragment>
    </ThemeProvider>
  );
};

export default ProjectLayout;
