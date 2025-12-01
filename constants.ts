import { ExperimentMode, ExperimentTheory } from './types';

export const THEORY_DATA: Record<ExperimentMode, ExperimentTheory> = {
  A: {
    title: "Anesthetic Inhibition of Superradiance",
    mechanism: "Dipole Detuning via Hydrophobic Binding",
    equation: "g²(τ) = 1 + exp(-|τ|/τ_c)",
    hypothesis: "Anesthetics act as 'Decoherence Catalysts', collapsing the collective superradiant state (g² > 1) to a classical Poissonian state (g² = 1).",
    references: [
      { text: "Babcock et al. (2024): Ultraviolet Superradiance in Tryptophan", url: "https://scholar.google.com/scholar?q=Babcock+superradiance+microtubules" },
      { text: "Kurian et al. (2025): Cooperative Effects in Tubulin", url: "https://scholar.google.com/scholar?q=Kurian+cooperative+effects+tubulin" },
      { text: "Craddock et al. (2017): Anesthetic Binding Sites", url: "https://pubmed.ncbi.nlm.nih.gov/28969376/" }
    ],
    controls: ["Temperature (310K)", "UV Flux", "Microtubule Density"]
  },
  B: {
    title: "Gravitational Decoherence (Penrose Limit)",
    mechanism: "Space-Time Geometry Superposition",
    equation: "τ ≈ ℏ / E_G",
    hypothesis: "Biological systems suppress thermal noise long enough for Gravitational Self-Energy (E_G) to induce state reduction (The 'Conscious Moment').",
    references: [
      { text: "Penrose (1996): Gravity & State Reduction", url: "https://link.springer.com/article/10.1007/BF02105068" },
      { text: "Hameroff & Penrose (2014): Orch OR Review", url: "https://www.sciencedirect.com/science/article/pii/S157106451300174X" },
      { text: "Folman et al. (2025): Interferometry in Microgravity", url: "https://scholar.google.com/scholar?q=Folman+stern-gerlach+gravity+decoherence" }
    ],
    controls: ["Seismic Isolation (>60dB)", "Magnetic Shielding", "Microgravity"]
  },
  C: {
    title: "Bio-Magnetic Entrainment",
    mechanism: "Stochastic Resonance & CISS Rectification",
    equation: "HRV_max ∝ exp(-(f - f_Schumann)²)",
    hypothesis: "The Cardiac Binary utilizes environmental 'Zeitgebers' (7.83 Hz) to phase-lock the organism's quantum state via hemodynamic rectification.",
    references: [
      { text: "McCraty et al. (2017): Synchronization of Human Autonomic System", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5551208/" },
      { text: "Naaman (2024): Chiral Induced Spin Selectivity (CISS)", url: "https://scholar.google.com/scholar?q=Naaman+CISS+effect+biology" },
      { text: "Persinger (2014): Schumann Resonance & Brain Activity", url: "https://scholar.google.com/scholar?q=Persinger+Schumann+resonance+brain" }
    ],
    controls: ["Field Intensity (pT)", "Frequency Stability", "Shielding"]
  },
  D: {
    title: "Microdosing Neuroplasticity",
    mechanism: "5-HT2A Receptor Agonism & BDNF Upregulation",
    equation: "P(t) = P_0 + α · dose · exp(-dose/dose_opt)",
    hypothesis: "Sub-perceptual doses of psilocybin enhance neural plasticity and network flexibility without inducing entropic overload (hallucinations), optimizing the 'Sattvic' coherent state.",
    references: [
      { text: "Cavanna et al. (2022): Microdosing & Neuroplasticity", url: "https://www.nature.com/articles/s41398-022-02039-0" },
      { text: "Vollenweider (2024): Psychedelics and Connectivity", url: "https://scholar.google.com/scholar?q=Vollenweider+psychedelics+connectivity+2024" },
      { text: "Carhart-Harris (2019): REBUS and the Anarchic Brain", url: "https://pharmrev.aspetjournals.org/content/71/3/316" }
    ],
    controls: ["Dose (mg)", "Frequency (Days)", "Set & Setting"]
  }
};