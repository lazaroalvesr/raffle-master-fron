import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { SetStateAction } from "react";

interface ErrorDrawWinnerDialogProps {
    erroDrawWinnere: string | null;
    setErrorDrawWinner: (value: SetStateAction<string | null>) => void;
}

export const ErrorDrawWinnerDialog: React.FC<ErrorDrawWinnerDialogProps> = ({ erroDrawWinnere, setErrorDrawWinner }) => {
    return (
        <AlertDialog open={erroDrawWinnere !== null}>
            <AlertDialogTrigger asChild>
                <button></button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[340px] lg:w-full md:w-full">
                <AlertDialogHeader>
                    <AlertDialogTitle>Não há bilhetes comprados para este sorteio</AlertDialogTitle>
                    <AlertDialogDescription>
                        {erroDrawWinnere}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => setErrorDrawWinner(null)}
                    >
                        Fechar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
