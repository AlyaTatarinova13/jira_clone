"use client";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { AiFillGithub, AiFillStar } from "react-icons/ai";
import { useFullURL } from "@/hooks/use-full-url";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select
      className="mr-1 dark:bg-transparent dark:text-gray-300"
      value={theme}
      onChange={(e) => {
        return setTheme(e.target.value);
      }}
    >
      <option className="dark:bg-gray-800" value="dark">
        Dark
      </option>
      <option className="dark:bg-gray-800" value="light">
        Light
      </option>
    </select>
  );
};

const TopNavbar: React.FC = () => {
  const { user } = useUser();
  const [url] = useFullURL();
  const [stars, setStars] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchStars();
  }, []);

  async function fetchStars() {
    const response = await fetch(
      "https://api.github.com/repos/sebastianfdz/jira_clone"
    );
    if (!response.ok) {
      setStars(null);
      return;
    }
    const data = (await response.json()) as { stargazers_count: number };
    setStars(data.stargazers_count ?? null);
  }

  return (
    <div className="flex h-12 w-full items-center justify-between border-b px-4 dark:border-gray-600">
      <div className="flex items-center gap-x-2 ">
        <Image
          src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
          alt="Jira logo"
          width={25}
          height={25}
        />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Jira Clone
        </span>
        <Button
          href="https://github.com/sebastianfdz/jira_clone"
          target="_blank"
          className="ml-3 flex gap-x-2 px-2 dark:border-gray-900 dark:bg-gray-700 dark:bg-opacity-60 dark:text-gray-300"
        >
          <AiFillGithub />
          <span className="text-sm font-medium">Github Repo</span>
        </Button>
        {stars ? (
          <Button
            href="https://github.com/sebastianfdz/jira_clone"
            target="_blank"
            customColors
            className="ml-3 flex gap-x-2 bg-gray-700 dark:border-gray-900 dark:bg-gray-700  dark:bg-opacity-60"
          >
            <AiFillGithub className="text-white dark:text-gray-300 " />
            <span className=" text-sm font-medium text-white dark:text-gray-300 ">
              Star
            </span>
            <div className="flex items-center pr-1.5 text-sm font-medium text-white  dark:text-gray-300">
              <span className="pr-1">{stars}</span>
              <AiFillStar className="text-yellow-300" />
            </div>
          </Button>
        ) : null}
      </div>
      {user ? (
        <div className="flex items-center gap-x-2">
          <ThemeSwitch />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {user?.fullName ?? user?.emailAddresses[0]?.emailAddress ?? "Guest"}
          </span>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard:
                  "dark:bg-gray-800 dark:text-gray-300 rounded-[3px] border-[0.3px] dark:border-white",
                userPreviewSecondaryIdentifier: "dark:text-gray-300",
                userButtonPopoverActionButton: "dark:bg-gray-800 hover:dark:hover:bg-gray-700",
                userButtonPopoverActionButtonIcon: "dark:text-gray-300 hover:dark:text-white",
                userButtonPopoverActionButtonText: "dark:text-gray-300 hover:dark:text-white",
                userButtonPopoverFooter: "hidden",
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
      ) : (
        <div className="flex items-center gap-x-3">
          <div className="rounded-sm bg-inprogress px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600 dark:border-gray-900 dark:bg-gray-700 dark:bg-opacity-80 dark:text-gray-300">
            <SignInButton mode="modal" redirectUrl={url} />
          </div>
        </div>
      )}
    </div>
  );
};

export { TopNavbar };
