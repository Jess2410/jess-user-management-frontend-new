import { useState } from "react";
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

interface Identifiable {
  id: number;
  key: string;
}

export default function TransferList<T extends Identifiable>({
  allItems,
  selectedItems,
  setSelectedItems,
}: TransferListProps<T>) {
  const [checked, setChecked] = useState<T[]>([]);
  const [left, setLeft] = useState<T[]>(
    allItems.filter(
      (item) =>
        !selectedItems.find((selectedItem) => selectedItem.key === item.key)
    )
  );

  const checkedIds = checked.map((item) => item.id);
  const leftIds = left.map((item) => item.id);
  const selectedItemsIds = selectedItems.map((selectedItem) => selectedItem.id);

  const leftCheckedIds = intersection(checkedIds, leftIds);

  const selectedItemsCheckedIds = intersection(checkedIds, selectedItemsIds);

  const getItemById = (id: number): T | undefined => {
    return allItems.find((item) => item.id === id);
  };

  const handleToggle = (value: T) => () => {
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
    setSelectedItems(
      selectedItems.concat(leftCheckedIds.map((id) => getItemById(id)) as T[])
    );

    setLeft(not(leftIds, leftCheckedIds).map((id) => getItemById(id)) as T[]);

    setChecked(
      not(checkedIds, leftCheckedIds).map((id) => getItemById(id)) as T[]
    );
  };

  const handleCheckedLeft = () => {
    setLeft(
      left.concat(selectedItemsCheckedIds.map((id) => getItemById(id)) as T[])
    );
    setSelectedItems(
      not(selectedItemsIds, selectedItemsCheckedIds).map((id) =>
        getItemById(id)
      ) as T[]
    );
    setChecked(
      not(checkedIds, selectedItemsCheckedIds).map((id) =>
        getItemById(id)
      ) as T[]
    );
  };

  const handleAllLeft = () => {
    setLeft(left.concat(selectedItems));
    setSelectedItems([]);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
          <List dense component="div" role="list">
            {left.map((value: T, index) => {
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItem
                  key={index}
                  role="listitem"
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

                  <ListItemText id={labelId} primary={value.key} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
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
            disabled={leftCheckedIds.length === 0}
            aria-label="move selected selectedItems"
          >
            &gt;
          </Button>

          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={selectedItemsCheckedIds.length === 0}
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

      <Grid item>
        <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
          <List dense component="div" role="list">
            {selectedItems.map((value: T, index) => {
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItem
                  key={index}
                  role="listitem"
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

                  <ListItemText id={labelId} primary={value.key} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
