import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

function Html5QrcodePlugin(props) {
    const html5QrcodeScannerRef = useRef(null);

    useEffect(() => {
        // Creates the configuration object for Html5QrcodeScanner.
        function createConfig(props) {
            const config = {};
            if (props.fps) {
                config.fps = props.fps;
            }
            if (props.qrbox) {
                config.qrbox = props.qrbox;
            }
            if (props.aspectRatio) {
                config.aspectRatio = props.aspectRatio;
            }
            if (props.disableFlip !== undefined) {
                config.disableFlip = props.disableFlip;
            }
            return config;
        }

        const config = createConfig(props);
        const verbose = props.verbose === true;

        const onScanSuccess = (qrMessage) => {
            props.qrCodeSuccessCallback(qrMessage);
            html5QrcodeScannerRef.current.html5Qrcode.clear();
        };

        // Success callback is required.
        if (!props.qrCodeSuccessCallback) {
            console.log('qrCodeSuccessCallback is required callback.');
        }

        html5QrcodeScannerRef.current = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScannerRef.current.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);
        html5QrcodeScannerRef.current.html5Qrcode.start(
            { facingMode: 'environment' },
            config,
            onScanSuccess,
            props.qrCodeErrorCallback
        );

        return () => {
            html5QrcodeScannerRef.current.clear().catch((error) => {
                console.error('Failed to clear html5QrcodeScanner. ', error);
            });
        };
    }, [props]);

    return <div id={qrcodeRegionId} />;
}

export default Html5QrcodePlugin;
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import React from 'react';

// const qrcodeRegionId = 'html5qr-code-full-region';

// class Html5QrcodePlugin extends React.Component {
//     componentDidMount() {
//         // Creates the configuration object for Html5QrcodeScanner.
//         function createConfig(props) {
//             const config = {};
//             if (props.fps) {
//                 config.fps = props.fps;
//             }
//             if (props.qrbox) {
//                 config.qrbox = props.qrbox;
//             }
//             if (props.aspectRatio) {
//                 config.aspectRatio = props.aspectRatio;
//             }
//             if (props.disableFlip !== undefined) {
//                 config.disableFlip = props.disableFlip;
//             }
//             return config;
//         }

//         const config = createConfig(this.props);
//         // eslint-disable-next-line
//         const verbose = this.props.verbose === true;

//         const onScanSuccess = (qrMessage) => {
//             // eslint-disable-next-line
//             this.props.qrCodeSuccessCallback(qrMessage);
//             this.html5QrcodeScanner.html5Qrcode.clear();
//         };

//         // Succeess callback is required.
//         // eslint-disable-next-line
//         if (!this.props.qrCodeSuccessCallback) {
//             console.log('qrCodeSuccessCallback is required callback.');
//         }

//         this.html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
//         // eslint-disable-next-line
//         this.html5QrcodeScanner.render(this.props.qrCodeSuccessCallback, this.props.qrCodeErrorCallback);
//         // eslint-disable-next-line
//         this.html5QrcodeScanner.html5Qrcode.start(
//             { facingMode: 'environment' },
//             config,
//             // eslint-disable-next-line
//             onScanSuccess,
//             // eslint-disable-next-line
//             this.props.qrCodeErrorCallback
//         );
//     }

//     componentWillUnmount() {
//         this.html5QrcodeScanner.clear().catch((error) => {
//             console.error('Failed to clear html5QrcodeScanner. ', error);
//         });
//     }

//     render() {
//         return <div id={qrcodeRegionId} />;
//     }
// }

// export default Html5QrcodePlugin;
