import { Typography, Box } from "@mui/material";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`event-tabpanel-${index}`} aria-labelledby={`event-tab-${index}`}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

export default TabPanel;
