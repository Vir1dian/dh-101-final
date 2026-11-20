## Admissions by State

*Placeholder: how did refugee admissions across U.S. states change after the transition from the Obama administration to the Trump administration in 2017, and which states saw the largest declines?*

## Refugee Declines Mapped

*By Gavin Torrecampo*

[[viz:refugee-declines-map]]

### Method

I created this map in Tableau Public using the cleaned DHS state immigration dataset my team selected. For each state, I averaged the “Refugees Per Million” values for FY2013-2016 (Obama) and FY2018-2019 (Trump, before COVID-19), the same periods as my bar chart in the last assessment, and subtracted to find how many fewer refugees per million residents arrived each year. I chose a filled map adjusted for population because coloring states by raw counts would mostly show which states are largest, while a per-million measure shows how much the decline mattered relative to each state’s size. I used a single purple scale in five steps instead of red and blue because readers tend to see red and blue on U.S. maps as political parties. I also labeled each state with its value, hovering over a state in the interactive version also shows its before and after averages. Because Tableau draws maps in Web Mercator which enlarges Alaska and places it and Hawaii far from the other states, I focused the view on the lower 48. This leaves Alaska (116), Hawaii (2) and Puerto Rico (0) out of the image, and Washington, D.C. (16) is too small to see, but all four appear in the interactive version. The map connects to our research questions about which states saw the largest declines after 2017 and whether political leaning shaped those changes.

### Analysis

Measured relative to population, the decline after 2017 was steepest not in the large states that led my bar chart, but in the Northern Plains and Mountain West. North Dakota lost about 509 refugee arrivals per million residents per year, followed by Nebraska (420), South Dakota (384), Idaho (354), Vermont (337) and Arizona (334), while Texas (204) and California (128) fall to the middle of the range. These smaller states had resettled more refugees for their size than almost anywhere else, so the same federal cut reshaped their refugee communities more than the raw totals suggest. Several of the states that were hit the hardest, including North Dakota, Nebraska, South Dakota, Idaho, and Arizona, voted Republican in 2016, which complicates any assumption that restrictive federal policy mainly affected Democratic-leaning places and sharpens our team’s question about political leaning. The map also has meaningful gaps. Wyoming shows zero because it is the only state without a refugee resettlement program. Montana’s increase likely correlates to the International Rescue Committee reopening its Missoula office in 2016, so a light color can mean a program was absent rather than that the state was unaffected. Because DHS rounds count to the nearest ten, per-million values for states with very few refugees, such as Hawaii and Delaware, should be read with caution.

## Refugee Declines by State

*By Jai Binning*

[[viz:refugee-decline-by-state]]

### Chart type

When we want to compare a single measure across many categories, a bar chart works well. This is because the bar length is one of the most accurate visual cues for judging differences in size. A bar chart helps so that all state names are visible and to see the clear differences between the states. They were sorted from largest to smallest decline, so this chart reads more as a ranking of refugee declines rather than a collection of states. Each bar represents the percent decline between a state’s average annual refugee admissions in 2013 to 2016 and its average in 2017 to 2019. States are listed on the vertical axis, the percent decline is on the horizontal axis, and each bar is labeled with its value in a single blue color. I excluded states that averaged fewer than 100 refugees per year before 2017, because at those numbers, a change of a few people produces misleadingly extreme percentages. A caption below the chart notes this exclusion. The purpose of the chart is to convey to the viewer that there is a widespread decline in refugee admissions over the U.S. The chart shows that every included state saw a decline. States like Louisiana (80%), Alabama (69%), Florida (69%) fell the most. While Iowa (15%), South Carolina (17%), and Washington (20%) fell the least. About two-thirds of states declined between 46% and 64%, which shows that this decline was nationwide rather than concentrated in a few places.

### Analysis

In the year 2017 Donald Trump took office and replaced Barack Obama. In that year the Trump administration suspended the refugee program and then repeatedly lowered the annual refugee ceiling, cutting the 2017 ceiling from the 110,000 set by Obama to 50,000, then to 45,000 in 2018 and 30,000 in 2019. The decline in refugee admissions aligns with the actions of the Trump administration in 2017. This decline appears in every state in the chart at once. This connects to our project’s theme of power because it shows how a single executive decision is able to impact nationwide resettlement no matter how much capacity each state has built up. Still, the size of the decline varied widely, from 80% in Louisiana to 15% in Iowa. Both of those states are right-leaning states, so politics alone doesn’t explain the gap. Local factors, such as how many resettlement offices a state had and whether they stayed open, may matter more. Silence is another theme that this chart shows because aggregate state totals don’t tell us the specifics of who was impacted, what nationalities were affected the most, or how communities were precisely impacted by this change. There were also states that were excluded in this chart for having too small of numbers, so their refugee populations were too small to register in the data. These findings raise questions like why did some states lose more than others? Also, which groups of refugees bore the largest share of the cuts?
