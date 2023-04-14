import { type ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@/components/ui/pop-over";
import { AiFillGithub } from "react-icons/ai";

const NotImplemented: React.FC<{ children: ReactNode; feature?: string }> = ({
  children,
  feature,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverPortal>
        <PopoverContent side="left" align="end" sideOffset={5}>
          <div className="rounded-md border-2 bg-white px-8 py-4">
            <h1 className="text-lg font-semibold">Not implemented</h1>
            <p className="max-w-32 flex text-sm text-gray-500">
              {feature
                ? `This is a simplified Jira Clone. The ${feature} feature is not implemented`
                : "This is a simplified Jira Clone. This feature is not implemented."}
            </p>
            <div className="mt-2 flex items-center gap-x-2">
              <AiFillGithub className="text-2xl" />
              <p className="text-lg">Find the repo </p>
              <a
                href="https://github.com/sebastianfdz/jira_clone"
                target="_blank"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                here
              </a>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};

export { NotImplemented };