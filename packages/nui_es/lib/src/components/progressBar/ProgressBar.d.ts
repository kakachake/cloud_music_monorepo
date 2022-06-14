import { FunctionComponent } from "react";
interface ProgressBarProps {
    percent: number;
    underPercent?: number;
    setPercent: (percent: number) => void;
    onChangeStart?: () => void;
    onChangeing?: () => void;
    onChangeEnd?: () => void;
    height?: number;
}
declare const ProgressBar: FunctionComponent<ProgressBarProps>;
export default ProgressBar;
