'use client';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, styled } from "@mui/material";
import { useNotify } from '../hooks/notify';
import { CommonProps } from '@mui/material/OverridableComponent';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export function UploadButton({onFileSelected, ...otherProps}: {onFileSelected: (f: File) => any} & CommonProps) {
    const notify = useNotify();

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            size='large'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={async (e) => {
                const element = e.target as HTMLInputElement;
                const files = element.files ?? [];
                if (!files[0]) {
                    notify.error('No files selected.');
                    return;
                }

                onFileSelected(files[0]);
            }}
            {...otherProps}
        >
            Upload conversation
            <VisuallyHiddenInput type="file" />
        </Button>
    )
}