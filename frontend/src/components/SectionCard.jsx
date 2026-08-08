function getCardImage(title) {
  const text = String(title || "").toLowerCase();

  // About
  if (text.includes("mission")) {
    return "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("vision")) {
    return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("legacy")) {
    return "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80";
  }

  // Academics
  if (text.includes("program")) {
    return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("curriculum") || text.includes("cirriculum")) {
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("academic") || text.includes("calendar") || text.includes("calender")) {
    return "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80";
  }

  // Admissions
  if (text.includes("eligibility") || text.includes("eliglibity") || text.includes("eligible")) {
    return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("scholarship")) {
    return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("timeline") || text.includes("application")) {
    return "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1600&q=80";
  }

  // Placements
  if (text.includes("recruit")) {
    return "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("preparation") || text.includes("interview") || text.includes("training")) {
    return "https://images.unsplash.com/photo-1522202222209-7b762f0b0b5e?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("internship") || text.includes("intership") || text.includes("interships")) {
    return "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("placement")) {
    return "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80";
  }

  // Alumni
  if (text.includes("alumni network") || text.includes("alumini network") || text.includes("network")) {
    return "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("distinguished") || text.includes("distinguised") || text.includes("distinguished alumni")) {
    return "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("give back") || text.includes("giveback") || text.includes("donate") || text.includes("contribute")) {
    return "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80";
  }

  // Contact
  if (text.includes("address") || text.includes("location")) {
    return "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("admissions") || text.includes("admission office") || text.includes("admissions office")) {
    return "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("student affairs") || text.includes("student")) {
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80";
  }

  // Existing broader categories (fallbacks)
  if (text.includes("research") || text.includes("innovation") || text.includes("lab")) {
    return "https://images.unsplash.com/photo-1581093458791-9d15482442f5?auto=format&fit=crop&w=1600&q=80";
  }
  if (text.includes("campus") || text.includes("club")) {
    return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80";
  }
  return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80";
}

function SectionCard({ title, description, children, imageUrl }) {
  const resolvedImage = imageUrl || getCardImage(title);

  return (
    <article className="surface surface-hover group overflow-hidden">
      <div className="relative">
        <img
          src={resolvedImage}
          alt={title}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
      </div>
      <div className="space-y-3 p-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-100">{title}</h3>
        {description && <p className="text-sm leading-relaxed text-slate-300">{description}</p>}
        {children && <div className="pt-1">{children}</div>}
      </div>
    </article>
  );
}

export default SectionCard;
