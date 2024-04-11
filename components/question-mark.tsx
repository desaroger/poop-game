import QuestionMarkSharp from "@mui/icons-material/QuestionMarkSharp";
import { IconButton, Tooltip } from "@mui/material";

export function QuestionMark({message}: {message: string}) {
    return (
        <Tooltip title={message}>
            <IconButton size='small' style={{width: 15, height: 15, verticalAlign: 'top'}}>
                <QuestionMarkSharp style={{width: 15, height: 15}}/>
            </IconButton>
        </Tooltip>
    )
}
