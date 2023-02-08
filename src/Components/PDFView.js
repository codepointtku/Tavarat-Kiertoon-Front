import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
// import PDFDocument from './PDFCreator';

function PDFView() {
    const location = useLocation();
    const { data } = location.state ? location.state : {}

    console.log( '### PDFView', data )

    return (
        <PDFViewer style={{ width: '100%', height: '1500px', border: '1px solid blue' }}>
            {/* <PDFDocument order={data} /> */}
        </PDFViewer>
    );
}

export default PDFView;
