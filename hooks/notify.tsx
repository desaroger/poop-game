'use client';
import { SharedProps, enqueueSnackbar } from "notistack";


export function useNotify() {
    return {
        error(message: string, opts?: Partial<SharedProps>){
            enqueueSnackbar({
                variant: 'error',
                message,
                autoHideDuration: null,
                ...opts
            })
        }
    }
}