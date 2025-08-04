import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import countries from "@/lib/data/countries.json";

export default function ContactSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h1 className="text-center text-4xl font-semibold lg:text-5xl">
          Contáctanos
        </h1>
        <p className="mt-4 text-center">
          ¿Tienes preguntas o necesitas más información? ¡Estamos aquí para
          ayudarte! Completa el formulario a continuación y nos pondremos en
          contacto contigo lo antes posible.
        </p>

        <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
          <div>
            <h2 className="text-xl font-semibold">
              Interesados en adquirir la aplicación?
            </h2>
            <p className="mt-4 text-sm">
              Si estás interesado en adquirir la aplicación, por favor completa
              el formulario a continuación.
            </p>
          </div>

          <form
            action=""
            className="**:[&>label]:block mt-12 space-y-6 *:space-y-3"
          >
            <div>
              <Label htmlFor="name"> Nombre completo </Label>
              <Input type="text" id="name" required />
            </div>

            <div>
              <Label htmlFor="email"> Correo electrónico </Label>
              <Input type="email" id="email" required />
            </div>

            <div>
              <Label htmlFor="country"> Pais </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country/Region" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="msg">Mensaje</Label>
              <Textarea id="msg" rows={3} />
            </div>

            <Button>Enviar</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
