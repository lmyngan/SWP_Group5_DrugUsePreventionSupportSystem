import React from "react";
import "../styles/WhoWeAre.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Users } from "lucide-react";

const AboutUsSection = () => (
    <Card className="intro-card">
            <CardContent>
              <h2 className="section-title">
                Why Drug Prevention Matters
              </h2>
              <div className="prose">
                <p>
                  Every year, millions of youth and families are affected by drugs, not just through addiction but also through emotional, social and economic consequences. While treatment is crucial,{" "}
                  <strong>
                    early prevention has proven to be one of the most effective ways to reduce drug use risks
                  </strong>
                  . Prevention begins with awareness, education and timely support.
                </p>
                <p>
                  However, the reality is many don't know where to start. They may feel overwhelmed, ashamed or unaware of risks. Teachers lack guidance materials. Parents don't know how to talk to their children. Students hesitate to ask.
                </p>
                <p className="highlight-text">This is why Drugs Prevention (DP) was created.</p>
              </div>
            </CardContent>
    </Card>
    
    
);

export default AboutUsSection;