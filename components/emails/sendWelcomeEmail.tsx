import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Tailwind,
  Row,
  Column,
  Link,
  pixelBasedPreset,
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
        <Tailwind
          config={{
            presets: [pixelBasedPreset],
          }}
        >
          <Container className="bg-slate-50 m-5 rounded-lg px-8 py-10 max-w-[600px] mx-auto">
            <Section className="px-[32px] py-[40px]">
              <Row>
                <Column className="w-[80%]">
                  <Heading as="h1" className="uppercase">
                    PlotForge
                  </Heading>
                </Column>
                <Column align="right">
                  <Row align="right">
                    <Column>
                      <Link href="#">
                        <svg
                          className="size-6 mx-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1200"
                          height="1227"
                          fill="none"
                          viewBox="0 0 1200 1227"
                        >
                          <path
                            fill="#262626"
                            d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                          />
                        </svg>
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <svg
                          className="size-6 mx-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="256"
                          height="256"
                          preserveAspectRatio="xMidYMid"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="#262626"
                            d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
                          />
                        </svg>
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <svg
                          className="size-6 mx-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 36 36"
                          fill="url(#facebook__a)"
                          height="40"
                          width="40"
                        >
                          <defs>
                            <linearGradient
                              x1="50%"
                              x2="50%"
                              y1="97.078%"
                              y2="0%"
                              id="facebook__a"
                            >
                              <stop offset="0%" stop-color="#0062E0" />
                              <stop offset="100%" stop-color="#19AFFF" />
                            </linearGradient>
                          </defs>
                          <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
                          <path
                            fill="#FFF"
                            d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
                          />
                        </svg>
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
              <br />
              <br />© {new Date().getFullYear()} PlotSurge Inc.
              <br />
              <Link
                href="https://plotsurge.com/unsubscribe"
                className="underline text-gray-400"
              >
                Cancelar suscripción
              </Link>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
