import { Box, Button, Modal } from '@mui/material';
import { Form } from 'react-router-dom';

// interface for "Delete Bike Rental" Modal
interface DeleteBikeRentalModalInterface {
    renderModal: boolean;
    setRenderModal: React.Dispatch<React.SetStateAction<boolean>>;
    rentalId: number;
}

/**
 * Delete the selected bike rental from database
 *
 * @param renderModal boolean : determine if modal is on or off
 * @param setRenderModal function : setState callback to set renderModal state
 * @param rentalId number : id of the bike rental to be deleted
 * @returns
 */
function DeleteBikeRentalModal({ renderModal, setRenderModal, rentalId }: DeleteBikeRentalModalInterface) {
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
                <h3>Oletko varma että haluat poistaa tämän tilauksen?</h3>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-evenly"
                    paddingTop="2em"
                    component={Form}
                    method={'delete'}
                    action={`/pyorat/pyoravarasto/pyoratilaukset/${rentalId}/poista`}
                >
                    <Button onClick={() => setRenderModal(false)}>Peruuta</Button>
                    <Button color="error" type="submit">
                        Poista
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteBikeRentalModal;
