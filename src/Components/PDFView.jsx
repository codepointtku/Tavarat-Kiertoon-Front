import { PDFViewer } from '@react-pdf/renderer';
import { useLoaderData } from 'react-router-dom';
import PDFDocument from './PDFCreator';

/**
 * View for creating PDF document
 */
function PDFView() {
    const loader = useLoaderData();

    return (
        <PDFViewer style={{ width: '100%', height: '1500px', border: '1px solid blue' }}>
            <PDFDocument order={loader} />
        </PDFViewer>
    );
}

export default PDFView;
