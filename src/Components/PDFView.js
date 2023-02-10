import { PDFViewer } from '@react-pdf/renderer';
// import { useLocation } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import PDFDocument from './PDFCreator';

function PDFView() {
    // const location = useLocation();
    // const { data } = location.state ? location.state : {}
    const loader = useLoaderData();

    console.log('### PDFView', loader);

    return (
        <PDFViewer style={{ width: '100%', height: '1500px', border: '1px solid blue' }}>
            <PDFDocument order={loader} />
        </PDFViewer>
    );
}

export default PDFView;
