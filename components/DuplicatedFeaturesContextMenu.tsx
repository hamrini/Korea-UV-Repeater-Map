import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import CellTowerIcon from '@mui/icons-material/CellTower';
import FlashOnIcon from '@mui/icons-material/FlashOn';

export interface RepeaterInfoData { Name: string, Region: string, Tx: number, Rx: number, Callsign: string, Type: string, Note: string, Shift: number, Tone: number, Latitude: number, Longitude: number, Address: string }

export interface DucplatedFeatureContextMenuProps {
  contextMenu: { mouseX: number; mouseY: number } | null;
  setContextMenu: (value: { mouseX: number; mouseY: number } | null) => void;
  contextMenuFeaturesData: RepeaterInfoData[];
  setRepeaterInfo: (value: RepeaterInfoData) => void;
}

export const DucplatedFeatureContextMenu = ({ contextMenu, setContextMenu, contextMenuFeaturesData, setRepeaterInfo }: DucplatedFeatureContextMenuProps) => {
  // const setDetailProperties = useSetRecoilState(detailPropertiesState);
  // const setDetailViewOpen = useSetRecoilState(openDetailPropertiesDialogState);

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <>
      {contextMenu !== null && (
        <Menu
          className="ContextMenu"
          open={contextMenu !== null}
          //open
          onClose={handleClose}
          anchorReference="anchorPosition"
          sx={{ position: "fixed", zIndex: 1200 }}
          anchorPosition={{
            top: Math.floor(contextMenu.mouseY),
            left: Math.floor(contextMenu.mouseX)
          }}
          defaultChecked={false}
          defaultValue={undefined}

        >
          <MenuItem disabled>중계기</MenuItem>
          {contextMenuFeaturesData.map((feature, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                //const { projectId, detectionId, row } = feature;
                //if (projectId && detectionId && row) {
                // setDetailProperties({ projectId, detectionId, row });
                // setDetailViewOpen(true);
                setContextMenu(null);

                setRepeaterInfo(feature)
                //}
              }}
            >
              <ListItemIcon>
                {feature.Type === "광역망" ? <FlashOnIcon /> : <CellTowerIcon />}
              </ListItemIcon>
              <ListItemText primary={`${feature.Type} ${feature?.Name} (CallSign: ${feature.Callsign})`} secondary={`Tx:${feature.Tx}, Rx:${feature.Rx}, Tone: ${feature.Tone}`} />
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};