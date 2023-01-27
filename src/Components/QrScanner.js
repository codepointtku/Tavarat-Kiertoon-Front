import { useNavigate } from 'react-router';
import Html5QrcodePlugin from '../Utils/qrcodeScanner';

function QrScanner() {
    const navigate = useNavigate();
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(decodedResult, decodedText);
        navigate(-1, { replace: true, state: { qrcode: decodedText } });
    };
    return <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={onNewScanResult} />;
}

export default QrScanner;
