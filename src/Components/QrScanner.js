import Html5QrcodePlugin from '../Utils/qrcodeScanner';

function QrScanner() {
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(decodedResult, decodedText);
    };
    return <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={onNewScanResult} />;
}

export default QrScanner;
