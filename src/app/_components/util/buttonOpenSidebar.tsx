import Image from "next/image";

export const ButtonOpenSidebar = ({ setOpen }: { setOpen: () => void }) => {
    return (
        <button className="lg:hidden absolute top-4 left-8" onClick={setOpen}>
            <Image
                src="/img/icons/panel-left.svg"
                alt="Icone"
                width={25}
                height={25}
            />
        </button>
    );
};
