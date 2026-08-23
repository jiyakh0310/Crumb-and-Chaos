import { cn } from "@/utils/cn";
import Container from "./Container";

/**
 * Reusable vertical-rhythm section wrapper. Handles spacing so
 * individual pages/sections never have to guess at padding.
 */
export default function Section({
  as: Tag = "section",
  id,
  className,
  containerClassName,
  container = true,
  padding = "py-20 sm:py-28 lg:py-32",
  children,
  ...props
}) {
  const content = container ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  );

  return (
    <Tag id={id} className={cn(padding, className)} {...props}>
      {content}
    </Tag>
  );
}
