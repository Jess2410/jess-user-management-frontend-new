import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

type TransferListProps<T> = {
  allItems: T[];

  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
};
function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList<T>({
  allItems,
  selectedItems,
  setSelectedItems,
}: TransferListProps<T>) {
  const [checked, setChecked] = useState<T[]>([]);
  const [left, setLeft] = useState<T[]>([]);

  const leftChecked = intersection(checked, left);
  const selectedItemsChecked = intersection(checked, selectedItems);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllselectedItems = () => {
    setSelectedItems(selectedItems.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setSelectedItems(selectedItems.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(selectedItemsChecked));
    setSelectedItems(not(selectedItems, selectedItemsChecked));
    setChecked(not(checked, selectedItemsChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(selectedItems));
    setSelectedItems([]);
  };

  useEffect(() => {
    setLeft(allItems);
  }, []);

  useEffect(() => {
    console.log("selected items", selectedItems);
  }, [selectedItems]);
  const customList = (listItems: T[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {listItems.sort().map((value: number) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  const selectableItems = allItems.filter(
    (item) => !selectedItems.includes(item)
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        {customList(selectableItems.length ? selectableItems : left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllselectedItems}
            disabled={left.length === 0}
            aria-label="move all selectedItems"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected selectedItems"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={selectedItemsChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={selectedItems.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(selectedItems)}</Grid>
    </Grid>
  );
}
