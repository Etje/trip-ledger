import Button from "./Button";

export default function OverlayPanel() {
    return (
        <div className="w-full border border-border p-4 rounded-lg">
            <h1>Overlay Panel</h1>
            <div className="flex flex-row items-center justify-between gap-x-4 mt-4">
                <Button withIcon={false} extraClasses="hover:text-green-600 hover:border-green-600 w-full">
                    [Ritten]
                </Button>
                <Button withIcon={false} extraClasses="hover:text-green-600 hover:border-green-600 w-full">
                    [Dagen]
                </Button>
                <Button withIcon={false} extraClasses="hover:text-green-600 hover:border-green-600 w-full">
                    [Maand]
                </Button>
                <Button withIcon={false} extraClasses="hover:text-green-600 hover:border-green-600 w-full">
                    [Afstand]
                </Button>
            </div>
        </div>
    );
}