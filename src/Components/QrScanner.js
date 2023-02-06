import { useNavigate, generatePath, useLocation } from 'react-router';
import Html5QrcodePlugin from '../Utils/qrcodeScanner';

function QrScanner() {
    const navigate = useNavigate();
    const location = useLocation();

    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(decodedResult, decodedText);
        console.log(location.state.returnpath);
        navigate(generatePath(location.state.returnpath), {
            replace: true,
            state: { ...location.state, barcode: decodedText },
        });
    };
    return <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={onNewScanResult} />;
}

export default QrScanner;
