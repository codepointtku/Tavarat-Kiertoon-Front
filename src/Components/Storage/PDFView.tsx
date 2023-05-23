import { PDFViewer } from '@react-pdf/renderer';
import { useLoaderData } from 'react-router-dom';
import PDFDocument from './PDFCreator';

// Data of a single product inside (loader data)
export interface IProduct {
    available: boolean;
    barcode: string;
    category: number;
    category_name: string;
    color: number;
    color_name: string;
    date: string;
    free_description: string;
    group_id: string;
    id: number;
    measurements: string | null; // JTo: Check this
    name: string;
    pictures: { id: number; picture_address: string }[];
    price: number;
    shelf_id: string | null; // JTo: Check this
    storage_name: string;
    storages: number;
    weight: number;
    numberOfProducts?: number;
}

// Data that comes from loader
export interface ILoaderData {
    products: IProduct[]; // JTo: Is this correct ???
    contact: string;
    delivery_address: string;
    phone_number: string;
    order_info: string;
    id: number;
}

// Data passed to Document Creator
export interface IPDFDocument {
    order: ILoaderData;
}

/**
 * View for creating PDF document
 */
function PDFView() {
    const loader = useLoaderData() as ILoaderData;

    return (
        <PDFViewer style={{ width: '100%', height: '1500px' }}>
            <PDFDocument order={loader} />
        </PDFViewer>
    );
}

export default PDFView;
