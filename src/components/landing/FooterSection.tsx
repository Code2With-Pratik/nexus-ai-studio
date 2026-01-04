import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  company: [
    { label: "About AI", href: "#" },
    { label: "Company", href: "#" },
    { label: "Sitemap", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
  resources: [
    { label: "About Us", href: "#" },
    { label: "Discussions", href: "#" },
    { label: "Create Content", href: "#" },
    { label: "Resources AI", href: "#" },
  ],
};

export function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <footer id="contact" className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="mb-6 text-2xl font-bold text-foreground">
              Contact Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-secondary/50 border-border"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-secondary/50 border-border"
              />
              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="bg-secondary/50 border-border"
              />
              <Textarea
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="bg-secondary/50 border-border resize-none"
              />
              <Button variant="gradient" type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Footer Links */}
          <div>
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-bold text-foreground">Nexus AI</span>
            </div>
            <p className="mb-8 max-w-sm text-sm text-muted-foreground">
              Nexus AI is a platform empowering creators with AI-powered tools for content creation, design, analytics, and productivity solutions.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Product</h4>
                <ul className="space-y-2">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Company</h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Resources</h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/ohh_its_pratik/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/pratik-dhandare/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Code2With-Pratik"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2026 Nexus AI. All rights reserved to Code2With-Pratik.
        </div>
      </div>
    </footer>
  );
}
