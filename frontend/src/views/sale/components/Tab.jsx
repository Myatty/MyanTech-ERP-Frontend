import {
  Paper,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SelectedProduct from "./SelectProduct";
import { IconTrash } from "@tabler/icons-react";
const OrderTab = ({
  tabIndex,
  setTabIndex,
  orders,
  newOrder,
  setNewOrder,
  products,
  setOrders,
  selectedCustomer,
  selecteddate,
}) => {
  const handleDelete = (fakeId) => {
    const filterItem = orders.filter((o) => o.fakeOrderID !== fakeId);
    setOrders(filterItem);
  };
  const d = [1, 2, 4];
  return (
    <>
      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Order Lines" />
        <Tab label="Optional Products" />
        <Tab label="Other Info" />
      </Tabs>

      <Paper sx={{ mt: 2, p: 2 }}>
        {tabIndex === 0 && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Product Segment</TableCell>
                  <TableCell>Serial number</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => {
                  const deleteIcon = <IconTrash stroke={1.5} size="1.3rem" />;
                  return (
                    <TableRow key={index}>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.brand}</TableCell>
                      <TableCell>{order.category}</TableCell>
                      <TableCell>{order.product_segment}</TableCell>
                      <TableCell>{order.serial_number}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell
                        sx={{ color: "red" }}
                        onClick={() => {
                          handleDelete(order.fakeOrderID);
                        }}
                      >
                        {deleteIcon}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={7}></TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: 15 }}>
                    {orders.reduce((tol, val) => {
                      return (tol += val.totalPrice);
                    }, 0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* product order */}
            <SelectedProduct
              products={products}
              newOrder={newOrder}
              setNewOrder={setNewOrder}
              orders={orders}
              setOrders={setOrders}
              customer={selectedCustomer}
              selecteddate={selecteddate}
              
            />
          </>
        )}
      </Paper>
    </>
  );
};
export default OrderTab;
