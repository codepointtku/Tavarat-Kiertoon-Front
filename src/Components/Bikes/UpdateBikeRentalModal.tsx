import { Box, Button, Modal } from '@mui/material';
import { Form, SubmitFunction, useSubmit } from 'react-router-dom';
import { BikeRentalDepth, BikeRentalEnum } from '../../api';
import { UseFormHandleSubmit } from 'react-hook-form';

// interface for "Delete Bike Rental" Modal
interface DeleteBikeRentalModalInterface {
    renderModal: boolean;
    setRenderModal: React.Dispatch<React.SetStateAction<boolean>>;
    rentalId: number;
    rentalBikeStock: number[];
    setRenderDeleteBikeRentalModal: React.Dispatch<React.SetStateAction<boolean>>;
    rental: BikeRentalDepth;
    handleSubmit: UseFormHandleSubmit<{
        startDate: string;
        endDate: string;
        state: BikeRentalEnum | undefined;
        deliveryAddress: string;
        contact: string;
        contactPhoneNumber: string;
        extraInfo: string | undefined;
        user: number;
        bikeStock: string;
    }>;
    onSubmit: (data: any) => void;
}

/**
 * Delete the selected bike rental from database
 *
 * @param renderModal boolean : determine if modal is on or off
 * @param setRenderModal function : setState callback to set renderModal state
 * @param rentalId number : id of the bike rental to be deleted
 * @returns
 */
function UpdateBikeRentalModal({
    renderModal,
    setRenderModal,
    rentalId,
    rentalBikeStock,
    setRenderDeleteBikeRentalModal,
    rental,
    handleSubmit,
    onSubmit,
}: DeleteBikeRentalModalInterface) {
    return (
        <Modal open={renderModal} aria-labelledby="Delete Bike Rental Successful">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 4,
                }}
                textAlign="center"
            >
                <h3>Oletko varma että haluat päivittää tämän tilauksen?</h3>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-evenly"
                    paddingTop="2em"
                    component={Form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Button onClick={() => setRenderModal(false)}>Peruuta</Button>
                    <Button color="error" type="submit">
                        Päivitä
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default UpdateBikeRentalModal;
