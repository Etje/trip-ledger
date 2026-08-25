import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ButtonProps {
  withIcon?: boolean;
  withLink?: string;
  children: React.ReactNode;
  extraClasses?: string;
  onClick?: () => void;          // ← nieuw
}

export default function Button({
  withIcon = false,
  withLink = "",
  children,
  extraClasses,
  onClick,
}: ButtonProps) {
  const content = (
    <>
      {withIcon && <PlusIcon className="w-4 h-4 mr-2 inline-block" />}
      {children}
    </>
  );

  const className = `text-white font-bold m-0 py-2 px-4 rounded border border-border ${extraClasses || ''}`;

  if (withLink !== "") {
    return (
      <Link href={withLink} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}