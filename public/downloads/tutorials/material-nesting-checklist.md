# Material Nesting Optimization Checklist

## LaserCalc Pro Tutorial Series
**Tutorial:** Advanced Nesting Strategies for 80-90% Material Utilization  
**Purpose:** Maximize material usage and minimize scrap  
**Target:** Achieve 75-85% utilization consistently

---

## Pre-Nesting Preparation

### File Preparation
- [ ] All part files converted to DXF/DWG format
- [ ] Parts scaled to correct dimensions
- [ ] Common cutting removed from assembly files
- [ ] Parts ungrouped and separated
- [ ] Duplicate parts identified and counted
- [ ] Part orientation verified (top view)

### Material Selection
- [ ] Material type selected (mild steel, stainless, aluminum, etc.)
- [ ] Thickness specified and verified
- [ ] Sheet size confirmed (standard: 1500×3000mm or 1220×2440mm)
- [ ] Material cost per sheet documented
- [ ] Material availability checked
- [ ] Lead time for special orders noted

---

## Nesting Strategy Selection

### Choose Primary Strategy:
- [ ] **Common Line Cutting** - For rectangular parts with straight edges
- [ ] **Rotation Optimization** - Try 0°, 90°, 180°, 270° orientations
- [ ] **Part Grouping** - Group similar sizes together
- [ ] **Skeleton Nesting** - For parts with large internal cutouts
- [ ] **Grain Direction** - Consider material grain if applicable

### Kerf Compensation Settings:
- [ ] Kerf width confirmed (typical: 0.15-0.35mm)
- [ ] Offset direction set (inside for holes, outside for external cuts)
- [ ] Minimum spacing between parts: Kerf × 2 + 1mm safety
- [ ] Corner compensation enabled for tight radius parts

---

## Nesting Execution Checklist

### Initial Nest
- [ ] Load all parts into nesting software
- [ ] Set sheet size and quantity
- [ ] Apply kerf compensation
- [ ] Run auto-nest with default settings
- [ ] Record initial utilization: _______%

### Optimization Round 1: Part Rotation
- [ ] Enable part rotation (0°, 90°, 180°, 270°)
- [ ] Run optimization
- [ ] Check for interference or overlap
- [ ] Utilization after rotation: _______%
- [ ] Improvement: _______% points

### Optimization Round 2: Manual Adjustment
- [ ] Identify large gaps or wasted areas
- [ ] Manually reposition parts to fill gaps
- [ ] Try nesting small parts in skeleton areas
- [ ] Adjust part-to-edge distance (typical: 5-10mm)
- [ ] Utilization after manual adjustment: _______%

### Optimization Round 3: Lead-In/Lead-Out
- [ ] Set lead-in/lead-out type (line, arc, or loop)
- [ ] Position lead-ins to minimize thermal distortion
- [ ] Avoid placing lead-ins near fragile features
- [ ] Check that lead-ins don't interfere with adjacent parts
- [ ] Final utilization: _______%

---

## Quality & Safety Checks

### Cutting Path Review
- [ ] All internal features cut before external contours
- [ ] Proper pierce point locations (not on finished edge)
- [ ] No micro-joints or tab connections (unless intentional)
- [ ] Common line cutting verified (if applicable)
- [ ] Contour direction consistent (CW or CCW)

### Part Stability
- [ ] No small parts that could tip into cut path
- [ ] Large heavy parts won't fall after final cut
- [ ] Skeleton material sufficient to support parts
- [ ] Tab connections added where needed
- [ ] Sheet edge clearance adequate (5-10mm minimum)

### Thermal Management
- [ ] Heat-sensitive parts spaced apart
- [ ] Cutting sequence optimized to reduce warping
- [ ] No concentrated cutting in one area
- [ ] Lead-ins positioned away from critical dimensions

---

## Utilization Analysis

### Target Utilization by Job Type:
| Job Type | Target Utilization | Acceptable Range |
|----------|-------------------|------------------|
| High-volume production | 85-90% | 80-92% |
| Medium-volume | 75-85% | 70-88% |
| Prototype/custom | 65-75% | 60-80% |
| Complex geometry | 60-70% | 55-75% |

### Current Job Analysis:
- **Actual Utilization:** _______%
- **Target Utilization:** _______%
- **Performance:** [ ] Above Target [ ] On Target [ ] Below Target
- **Scrap Value:** $________
- **Utilization Efficiency Rating:** ________/10

---

## Cost-Benefit Analysis

### Time vs. Utilization Trade-Off:
```
Nesting Time Spent: ________ minutes
Utilization Gain: _______%
Material Cost Saved: $________
Hourly Nesting Cost: $25/hr
Break-Even Analysis: Is time spent worth material saved?
```

**Rule of Thumb:**  
If nesting time > 30 minutes and utilization gain < 5%, accept current nest and proceed.

---

## Common Nesting Mistakes to Avoid

- [ ] ❌ Parts too close together (< kerf + 1mm)
- [ ] ❌ Lead-ins cutting into adjacent parts
- [ ] ❌ Insufficient edge clearance causing sheet grip issues
- [ ] ❌ Over-optimizing at expense of cutting time
- [ ] ❌ Ignoring grain direction for stress-sensitive parts
- [ ] ❌ Not considering part removal sequence
- [ ] ❌ Forgetting to add tabs for thin/delicate parts

---

## Advanced Techniques Checklist

### Common Line Cutting:
- [ ] Identified parts with shared edges
- [ ] Aligned parts along common line
- [ ] Verified kerf compensation doesn't break common line
- [ ] Estimated time savings: ________ minutes

### Skeleton Utilization:
- [ ] Identified parts with large internal cutouts
- [ ] Nested smaller parts inside skeleton areas
- [ ] Verified small part stability during cutting
- [ ] Added tabs if skeleton parts need removal

### Multi-Sheet Optimization:
- [ ] Considered distributing parts across multiple sheets
- [ ] Balanced utilization vs. setup time
- [ ] Identified parts that can share sheet with other jobs
- [ ] Documented sheet allocation strategy

---

## Post-Nesting Review

### Final Verification:
- [ ] Utilization meets target threshold
- [ ] All parts fit within sheet boundaries
- [ ] No cutting path interference
- [ ] Lead-ins and lead-outs properly positioned
- [ ] Part quantities match order requirements
- [ ] Material cost calculated and documented
- [ ] Nesting file saved with job number reference

### Production Readiness:
- [ ] Nesting file exported to machine format (.nc, .tap, etc.)
- [ ] Job traveler created with sheet layout diagram
- [ ] Operator notes added for special requirements
- [ ] Material ordered or pulled from inventory
- [ ] Quality inspection points identified
- [ ] Estimated cutting time calculated

---

## Continuous Improvement

### Metrics to Track:
- **Average Utilization This Month:** _______%
- **Best Utilization Achieved:** _______%
- **Worst Utilization:** _______%
- **Material Cost Savings vs. Last Month:** $________
- **Number of Jobs Optimized:** ________

### Lessons Learned:
1. _____________________________________________________
2. _____________________________________________________
3. _____________________________________________________

### Action Items for Next Job:
- [ ] _____________________________________________________
- [ ] _____________________________________________________
- [ ] _____________________________________________________

---

## Quick Reference: Utilization Troubleshooting

| Issue | Solution |
|-------|----------|
| Utilization < 60% | Consider smaller sheet size or combine with other jobs |
| Many small gaps | Try rotation or manual repositioning |
| Large corner waste | Add filler parts or save skeleton for future use |
| Parts won't fit | Check part scale, verify sheet size, or split across sheets |
| Too much setup time | Accept current nest if within 10% of target |

---

*Generated by LaserCalc Pro Tutorial System*  
*For more resources and calculators, visit: www.lasercalcpro.com*

