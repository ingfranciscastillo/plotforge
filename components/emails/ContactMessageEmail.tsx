import { Html, Body, Container, Heading, Text } from "@react-email/components";

interface ContactMessageEmailProps {
  name: string;
  email: string;
  country: string;
  message: string;
}

export const ContactMessageEmail = ({
  name,
  email,
  country,
  message,
}: ContactMessageEmailProps) => {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f6f6f6" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            margin: "20px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ fontSize: "20px", marginBottom: "20px" }}>
            Nuevo mensaje de contacto
          </Heading>
          <Text>
            <strong>Nombre:</strong> {name}
          </Text>
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          <Text>
            <strong>País:</strong> {country}
          </Text>
          <Text>
            <strong>Mensaje:</strong>
          </Text>
          <Text>{message}</Text>
          <Text style={{ marginTop: "40px", fontSize: "12px", color: "#888" }}>
            Este mensaje fue enviado desde el formulario de contacto de
            PlotForge.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactMessageEmail;
