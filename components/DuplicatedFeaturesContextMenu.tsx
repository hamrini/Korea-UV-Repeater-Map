import { ListItemText, Menu, MenuItem } from "@mui/material";

export interface DuplicatedFeaturesContextData { Name: string, Region: string, Tx: number, Rx: number, Callsign: string, Type: string, Note: string, Shift: number, Tone: number, Latitude: number, Longitude: number }

export interface DucplatedFeatureContextMenuProps {
  contextMenu: { mouseX: number; mouseY: number } | null;
  setContextMenu: (value: { mouseX: number; mouseY: number } | null) => void;
  contextMenuFeaturesData: DuplicatedFeaturesContextData[];
}

export const DucplatedFeatureContextMenu = ({ contextMenu, setContextMenu, contextMenuFeaturesData }: DucplatedFeatureContextMenuProps) => {
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
          // open={contextMenu !== null}
          open
          onClose={handleClose}
          anchorReference="anchorPosition"
          sx={{ position: "fixed", zIndex: 1200 }}
          anchorPosition={{
            top: Math.floor(contextMenu.mouseY),
            left: Math.floor(contextMenu.mouseX)
          }}
        >
          {/* <MenuItem disabled>중복된 영역이 존재합니다.</MenuItem> */}
          {contextMenuFeaturesData.map((feature, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                //const { projectId, detectionId, row } = feature;
                //if (projectId && detectionId && row) {
                // setDetailProperties({ projectId, detectionId, row });
                // setDetailViewOpen(true);
                setContextMenu(null);
                //}
              }}
            >
              <ListItemText primary={`${feature.Name} (CallSign: ${feature.Callsign})`} secondary={`Tx:${feature.Tx}, Rx:${feature.Rx}, Tone: ${feature.Tone}`} />
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};