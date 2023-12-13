import { Box, Button, Modal } from '@mui/material';
import { Form, useSubmit} from 'react-router-dom';

// interface for "Delete Bike Trailer Rental" Modal
interface DeleteBikeTrailerModalInterface {
    renderModal: boolean;
    setRenderModal: React.Dispatch<React.SetStateAction<boolean>>;
    trailer: object;
}

/**
 * Delete the selected bike trailer from database
 *
 * @param renderModal boolean : determine if modal is on or off
 * @param setRenderModal function : setState callback to set renderModal state
 * @param trailer object : the bike trailer to be deleted
 * @returns
 */
function DeleteBikeTrailerModal({ renderModal, setRenderModal, trailer }: DeleteBikeTrailerModalInterface) {
    const submit = useSubmit();
    const onSubmit = (data: any) => {
        submit(data, { method: 'delete', action: '/pyorat/pyoravarasto/perakarryt' });
        setRenderModal(false)
    };

    return (
        <Modal open={renderModal} aria-labelledby="Delete Bike Trailer Successful">
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
                <h3>Oletko varma että haluat poistaa tämän peräkärryn? Tämä toiminto poistaa peräkärryn tulevilta tilauksilta jos sellaisia on.</h3>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-evenly"
                    paddingTop="2em"
                    component={Form}
                    action={`/pyorat/pyoravarasto/perakarryt`}
                >
                    <Button onClick={() => setRenderModal(false)}>Peruuta</Button>
                    <Button color="error" onClick={() => onSubmit(trailer)}>
                        Poista
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteBikeTrailerModal;
