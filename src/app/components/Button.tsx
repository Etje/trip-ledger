import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Button(
    { withIcon = false, withLink="", children, extraClasses }: 
    { withIcon?: boolean; withLink?: string; children: React.ReactNode; extraClasses?: string }
) {
    const content = (
        <>
            {withIcon && <PlusIcon className="w-4 h-4 mr-2 inline-block" />}
            {children}
        </>
    );

    if (withLink !== "") {
        return (
            <Link href={withLink} className={`text-white font-bold m-0 py-2 px-4 rounded border border-border ${extraClasses || ''}`}>
                {content}
            </Link>
        );
    }

    return (
        <button className={`text-white font-bold m-0 py-2 px-4 rounded border border-border ${extraClasses || ''}`}>
            {content}
        </button>
    );
}