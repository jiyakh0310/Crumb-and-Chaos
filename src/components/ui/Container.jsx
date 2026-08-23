import { cn } from "@/utils/cn";

/**
 * Consistent max-width wrapper used across the whole site.
 */
export default function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-(--container-max) px-6 sm:px-8 lg:px-12", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
