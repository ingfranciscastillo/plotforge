import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Row,
  Column,
  Link,
} from "@react-email/components";
import { Section } from "lucide-react";
import Facebook from "../icons/FacebookIcon";
import Instagram from "../icons/InstagramIcon";
import XformerlyTwitter from "../icons/XformerlyTwitter";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Body className="bg-slate-300">
        <Container className="bg-slate-50 m-5 rounded-lg px-8 py-10 max-w-[600px] mx-auto">
          <Section className="px-[32px] py-[40px]">
            <Row>
              <Column className="w-[80%]">
                <Heading as="h3" className="uppercase">
                  PlotForge
                </Heading>
              </Column>
              <Column align="right">
                <Row align="right">
                  <Column>
                    <Link href="#">
                      <XformerlyTwitter className="size-6 mx-1" />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="#">
                      <Instagram className="size-6 mx-1" />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="#">
                      <Facebook className="size-6 mx-1" />
                    </Link>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>
          {/* Mensaje de bienvenida */}
          <Section className="text-center">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              ¡Bienvenido a PlotSurge, {name}!
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              Gracias por registrarte. Estás a punto de comenzar una nueva
              aventura en la creación de historias interactivas, narrativas
              dinámicas y mundos únicos.
              <br />
              <br />
              ¡Nos emociona tenerte con nosotros! 🚀
            </Text>
          </Section>

          {/* Botón */}
          <Section className="text-center mt-6">
            <Link
              href="https://plotsurge.com/dashboard"
              className="inline-block bg-violet-600 text-white text-sm font-semibold px-6 py-3 rounded-md no-underline"
            >
              Ir al Dashboard →
            </Link>
          </Section>

          {/* Footer */}
          <Section className="text-center mt-10 text-xs text-gray-400">
            © {new Date().getFullYear()} PlotSurge Inc.
            <br />
            <Link
              href="https://plotsurge.com/unsubscribe"
              className="underline text-gray-400"
            >
              Cancelar suscripción
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
