"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subtitle = "Try adjusting your search or filter to find what you're looking for.",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        items-center
        justify-center
       
    "
    >
      <Heading center title={title} subtitle={subtitle} />

      <div
        className="
          w-48
          mt-2
        "
      >
        {showReset && (
          <Button
            outline
            label="Reset filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
