import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';

function CustomizedTimeline() {
    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '1.25rem', px: 2 }}>
                    <Typography sx={{ m: 'auto 0' }} variant="body1" color="primary.dark">
                        Odottaa vastaanottoa
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineSeparator>
                    <TimelineConnector />

                    <TimelineDot color="primary">
                        <LaptopMacIcon />
                    </TimelineDot>

                    <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ py: '2rem', px: 2 }}>
                    <Typography sx={{ m: 'auto 0' }} variant="body1" color="primary.dark" component="span">
                        Käsittelyssä
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '2rem', px: 2 }}>
                    <Typography
                        sx={{ m: 'auto 0' }}
                        align="right"
                        variant="body1"
                        color="primary.dark"
                        component="span"
                    >
                        Kuljetuksessa
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="success">
                        <FastfoodIcon sx={{ color: 'white' }} />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ pt: '1.75rem', px: 2 }}>
                    <Typography
                        sx={{ m: 'auto 0' }}
                        align="right"
                        variant="body1"
                        color="primary.dark"
                        component="span"
                    >
                        Toimitettu
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

export default CustomizedTimeline;
