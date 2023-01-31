import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './PDFCreator';

function PDFViev() {
    return (
        <PDFViewer style={{ width: '100%', height: '1500px', border: '1px solid blue' }}>
            <MyDocument />
        </PDFViewer>
    );
}

export default PDFViev;
