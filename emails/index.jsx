import * as React from "react";
import {
  Body,
  Container,
  Heading,
  Html,
  Section,
  Text,
  Button,
  Row,
  Column,
} from "@react-email/components";

// Sample order details (you can replace with actual data)
const orderDetails = {
  customerName: "John Doe",
  orderNumber: "123456",
  totalPrice: "45.99",
  items: [
    { name: "Cheeseburger", quantity: 2, price: 9.99 },
    { name: "Fries", quantity: 1, price: 3.49 },
    { name: "Soda", quantity: 1, price: 1.99 },
  ],
  trackLink: "https://tracking-link.com/123456",
};

export default function Email() {
  return (
    <Html>
      <Body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
          }}
        >
          <Section
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#365CCE",
            }}
          >
            <Heading
              style={{
                color: "#fff",
                fontSize: "24px",
                marginTop: "10px",
              }}
            >
              Food Order Confirmation
            </Heading>
          </Section>

          <Section style={{ padding: "20px" }}>
            <Text
              style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
            >
              Hi {orderDetails.customerName},
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#555", marginTop: "10px" }}
            >
              Thank you for your order! We're excited to prepare your meal. Below
              are the details of your order:
            </Text>

            <Row style={{ marginTop: "20px" }}>
              <Column style={{ width: "50%", paddingRight: "10px" }}>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Order Number:
                </Text>
                <Text style={{ fontSize: "16px", color: "#555" }}>
                  {orderDetails.orderNumber}
                </Text>
              </Column>
              <Column style={{ width: "50%", paddingLeft: "10px" }}>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Total Price:
                </Text>
                <Text style={{ fontSize: "16px", color: "#555" }}>
                  ${orderDetails.totalPrice}
                </Text>
              </Column>
            </Row>

            <Heading
              style={{
                marginTop: "30px",
                fontSize: "20px",
                color: "#333",
              }}
            >
              Order Details:
            </Heading>

            <table
              style={{
                width: "100%",
                marginTop: "20px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "14px",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    Item
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "14px",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "14px",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <td
                      style={{
                        padding: "8px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      ${item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 

            <Text
              style={{
                marginTop: "30px",
                fontSize: "14px",
                color: "#555",
              }}
            >
              If you have any questions, feel free to contact us at{" "}
              <a
                href="mailto:support@yourrestaurant.com"
                style={{ color: "#365CCE" }}
              >
                support@yourrestaurant.com
              </a>
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#999",
              }}
            >
              © {new Date().getFullYear()} Your Restaurant. All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
