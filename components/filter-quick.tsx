import { useFiltersContext } from "@/context/use-filters-context";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownPortal,
  DropdownTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CountBall } from "@/components/issue/issue-status-count";
import { FaChevronDown } from "react-icons/fa";
import { capitalize } from "@/utils/helpers";

export const QUICK_FILTER_TYPES: string[] = [
  "ONLY MY ISSUES",
  "RECENTLY UPDATED",
];

const QuickFilter: React.FC = () => {
  const { quickFilters, setQuickFilters } = useFiltersContext();

  function onSelectChange(
    e: React.ChangeEvent<HTMLInputElement>,
    selectedQuickFilter: string
  ) {
    if (e.target.checked) {
      setQuickFilters((prev) => [...prev, selectedQuickFilter]);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setQuickFilters((prev) => {
        return prev.filter((type) => type !== selectedQuickFilter);
      });
    }
  }
  return (
    <Dropdown>
      <DropdownTrigger className="rounded-[3px] [&[data-state=open]]:bg-gray-700 [&[data-state=open]]:text-white">
        <Button
          customColors
          className="flex items-center  gap-x-2 transition-all duration-200 hover:bg-gray-200"
        >
          <span className="text-sm">Quick filters</span>
          <CountBall
            count={quickFilters.length}
            className="bg-inprogress text-xs text-white"
            hideOnZero={true}
          />
          <FaChevronDown className="text-xs" />
        </Button>
      </DropdownTrigger>
      <DropdownPortal>
        <DropdownContent
          side="bottom"
          align="start"
          className="z-10 mt-2 w-52 rounded-[3px] border-[0.3px] bg-white py-4 shadow-md"
        >
          {QUICK_FILTER_TYPES.map((quickFilterType) => (
            <DropdownItem
              onSelect={(e) => e.preventDefault()}
              key={quickFilterType}
              className="text-sm hover:bg-gray-100"
            >
              <label
                htmlFor={`issue-type-filter-${quickFilterType}`}
                className="flex cursor-pointer items-center gap-x-2 px-3 py-1.5 "
              >
                <input
                  type="checkbox"
                  id={`issue-type-filter-${quickFilterType}`}
                  className="form-checkbox h-3 w-3 rounded-sm text-inprogress"
                  checked={quickFilters.includes(quickFilterType)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSelectChange(e, quickFilterType)
                  }
                />
                <span className="text-sm text-gray-700">
                  {capitalize(quickFilterType)}
                </span>
              </label>
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownPortal>
    </Dropdown>
  );
};

export { QuickFilter };
