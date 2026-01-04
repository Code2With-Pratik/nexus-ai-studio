import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Jamie Fontaine",
    role: "Digital Marketer",
    content:
      "Nexus AI has transformed my content workflow. I can create blog posts and social media content in minutes instead of hours. The quality is incredible!",
    avatar: "JF",
  },
  {
    name: "Amanda Rivers",
    role: "Content Creator",
    content:
      "The image generator is absolutely amazing. I've been able to create professional graphics for my brand without hiring a designer. Huge time saver!",
    avatar: "AR",
  },
  {
    name: "Jonathan Reid",
    role: "Startup Founder",
    content:
      "We've integrated Nexus AI into our product development workflow. The AI tools have helped us create marketing materials 10x faster.",
    avatar: "JR",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            See how Nexus AI is helping creators.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div className="mb-4 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
