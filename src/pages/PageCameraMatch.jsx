import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment-timezone'
import { IoCloseSharp } from "react-icons/io5"

const PageCameraMatch = () => {

    const diffDate = (date, nowDate) => {

        // const d1 = new Date(date)
        // const d2 = new Date(nowDate)
        const d1 = date
        const d2 = nowDate

        if (d1 > d2) {

            const t = d1 - d2;
            const json = {
                days: Math.floor(t / (1000 * 60 * 60 * 24)),
                hours: Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
            }
            return (json.days > 0 ? json.days + " GÜN " : '') + (json.hours > 0 ? json.hours + " SAAT " : '') + (json.minutes > 0 ? json.minutes + " DAKİKA " : '') + "İLERİ"

        } else if (d2 > d1) {

            const t = d2 - d1;
            const json = {
                days: Math.floor(t / (1000 * 60 * 60 * 24)),
                hours: Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
            }

            return (json.days > 0 ? json.days + " GÜN " : '') + (json.hours > 0 ? json.hours + " SAAT " : '') + (json.minutes > 0 ? json.minutes + " DAKİKA " : '') + "GERİ"

        } else {
            return "Kamera Saati GÜNCEL"
        }
    }
    const formatMillis = (millis) => {
        const date = new Date(millis);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    const [refDate, setRefDate] = useState(new Date().getTime())
    const [addForm, setAddForm] = useState(true)

    const [cameras, setCameras] = useState([
        {
            label: "Güncel",
            diff: 0,
            diffString: diffDate(refDate, refDate),
            date: refDate,
            dateString: formatMillis(refDate),
            dateUTC: moment(refDate).format('YYYY-MM-DDTHH:mm'),
            nextBack: '0',
        }
    ])


    const _handleForm = (e) => {

        e.preventDefault()

        const elements = e.target.elements
        const getDiffTime = (elements.day.value * 86400000) + (elements.hour.value * 3600000) + (elements.minute.value * 60000)
        const diffType = elements.nextBack.value

        const differentMS = diffType === '+'
            ? refDate + getDiffTime
            : diffType === '-'
                ? refDate - getDiffTime
                : refDate

        setCameras(prev => [
            ...prev,
            {
                label: elements.label.value,

                diff: diffType === '0' ? 0 : getDiffTime,

                diffString: diffDate(differentMS, refDate),

                date: differentMS,

                dateString: formatMillis(differentMS),

                dateUTC: moment(differentMS).format('YYYY-MM-DDTHH:mm'),

                nextBack: diffType,
            }
        ])

        setAddForm(!addForm)
    }

    const _handleInput = (inputType, e, index) => {

        if (inputType === 'current') {
            setRefDate(new Date(e.target.value).getTime())
        } else {
            setRefDate(prev => (
                cameras[index].nextBack === '+' ? new Date(e.target.value).getTime() - cameras[index].diff : new Date(e.target.value).getTime() + cameras[index].diff
            ))
        }

    }

    const _handleDelete = index => {
        setCameras(cameras.filter((cam,i)=>i!==index));
    }

    const reRender = () => {
        setCameras(prev => (
            prev.map((cam, i) => {
                const getDiffTime = cam.diff
                const diffType = cam.nextBack

                const differentMS = diffType === '+'
                    ? refDate + getDiffTime
                    : diffType === '-'
                        ? refDate - getDiffTime
                        : refDate

                return {
                    ...cam,
                    date: differentMS,
                    dateString: formatMillis(differentMS),
                    dateUTC: moment(differentMS).format('YYYY-MM-DDTHH:mm'),
                }
            })
        ))
    }

    useEffect(() => {
        reRender()
    }, [refDate])

    useEffect(() => {
    }, [cameras])

    return (
        <>
            <div>
                {
                    addForm === true
                        ? (
                            <form className='flex flex-col gap-3 mb-5 border-b border-dashed border-gray-600 pb-5' action="" onSubmit={_handleForm}>
                                <div className='flex flex-col'>
                                    <input type="text" name="label" className='bg-gray-500 rounded p-1 px-2' placeholder='Kamera Adı' />
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex flex-col grow'>
                                        <span className='text-xs font-semibold text-center mb-1 text-gray-400 pr-3'>GÜN</span>
                                        <select name="day" className='bg-gray-500 rounded p-1 px-2 text-center'>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>
                                            <option value="60">60</option>
                                            <option value="61">61</option>
                                            <option value="62">62</option>
                                            <option value="63">63</option>
                                            <option value="64">64</option>
                                            <option value="65">65</option>
                                            <option value="66">66</option>
                                            <option value="67">67</option>
                                            <option value="68">68</option>
                                            <option value="69">69</option>
                                            <option value="70">70</option>
                                            <option value="71">71</option>
                                            <option value="72">72</option>
                                            <option value="73">73</option>
                                            <option value="74">74</option>
                                            <option value="75">75</option>
                                            <option value="76">76</option>
                                            <option value="77">77</option>
                                            <option value="78">78</option>
                                            <option value="79">79</option>
                                            <option value="80">80</option>
                                            <option value="81">81</option>
                                            <option value="82">82</option>
                                            <option value="83">83</option>
                                            <option value="84">84</option>
                                            <option value="85">85</option>
                                            <option value="86">86</option>
                                            <option value="87">87</option>
                                            <option value="88">88</option>
                                            <option value="89">89</option>
                                            <option value="90">90</option>
                                            <option value="91">91</option>
                                            <option value="92">92</option>
                                            <option value="93">93</option>
                                            <option value="94">94</option>
                                            <option value="95">95</option>
                                            <option value="96">96</option>
                                            <option value="97">97</option>
                                            <option value="98">98</option>
                                            <option value="99">99</option>
                                            <option value="100">100</option>
                                            <option value="101">101</option>
                                            <option value="102">102</option>
                                            <option value="103">103</option>
                                            <option value="104">104</option>
                                            <option value="105">105</option>
                                            <option value="106">106</option>
                                            <option value="107">107</option>
                                            <option value="108">108</option>
                                            <option value="109">109</option>
                                            <option value="110">110</option>
                                            <option value="111">111</option>
                                            <option value="112">112</option>
                                            <option value="113">113</option>
                                            <option value="114">114</option>
                                            <option value="115">115</option>
                                            <option value="116">116</option>
                                            <option value="117">117</option>
                                            <option value="118">118</option>
                                            <option value="119">119</option>
                                            <option value="120">120</option>
                                            <option value="121">121</option>
                                            <option value="122">122</option>
                                            <option value="123">123</option>
                                            <option value="124">124</option>
                                            <option value="125">125</option>
                                            <option value="126">126</option>
                                            <option value="127">127</option>
                                            <option value="128">128</option>
                                            <option value="129">129</option>
                                            <option value="130">130</option>
                                            <option value="131">131</option>
                                            <option value="132">132</option>
                                            <option value="133">133</option>
                                            <option value="134">134</option>
                                            <option value="135">135</option>
                                            <option value="136">136</option>
                                            <option value="137">137</option>
                                            <option value="138">138</option>
                                            <option value="139">139</option>
                                            <option value="140">140</option>
                                            <option value="141">141</option>
                                            <option value="142">142</option>
                                            <option value="143">143</option>
                                            <option value="144">144</option>
                                            <option value="145">145</option>
                                            <option value="146">146</option>
                                            <option value="147">147</option>
                                            <option value="148">148</option>
                                            <option value="149">149</option>
                                            <option value="150">150</option>
                                            <option value="151">151</option>
                                            <option value="152">152</option>
                                            <option value="153">153</option>
                                            <option value="154">154</option>
                                            <option value="155">155</option>
                                            <option value="156">156</option>
                                            <option value="157">157</option>
                                            <option value="158">158</option>
                                            <option value="159">159</option>
                                            <option value="160">160</option>
                                            <option value="161">161</option>
                                            <option value="162">162</option>
                                            <option value="163">163</option>
                                            <option value="164">164</option>
                                            <option value="165">165</option>
                                            <option value="166">166</option>
                                            <option value="167">167</option>
                                            <option value="168">168</option>
                                            <option value="169">169</option>
                                            <option value="170">170</option>
                                            <option value="171">171</option>
                                            <option value="172">172</option>
                                            <option value="173">173</option>
                                            <option value="174">174</option>
                                            <option value="175">175</option>
                                            <option value="176">176</option>
                                            <option value="177">177</option>
                                            <option value="178">178</option>
                                            <option value="179">179</option>
                                            <option value="180">180</option>
                                            <option value="181">181</option>
                                            <option value="182">182</option>
                                            <option value="183">183</option>
                                            <option value="184">184</option>
                                            <option value="185">185</option>
                                            <option value="186">186</option>
                                            <option value="187">187</option>
                                            <option value="188">188</option>
                                            <option value="189">189</option>
                                            <option value="190">190</option>
                                            <option value="191">191</option>
                                            <option value="192">192</option>
                                            <option value="193">193</option>
                                            <option value="194">194</option>
                                            <option value="195">195</option>
                                            <option value="196">196</option>
                                            <option value="197">197</option>
                                            <option value="198">198</option>
                                            <option value="199">199</option>
                                            <option value="200">200</option>
                                            <option value="201">201</option>
                                            <option value="202">202</option>
                                            <option value="203">203</option>
                                            <option value="204">204</option>
                                            <option value="205">205</option>
                                            <option value="206">206</option>
                                            <option value="207">207</option>
                                            <option value="208">208</option>
                                            <option value="209">209</option>
                                            <option value="210">210</option>
                                            <option value="211">211</option>
                                            <option value="212">212</option>
                                            <option value="213">213</option>
                                            <option value="214">214</option>
                                            <option value="215">215</option>
                                            <option value="216">216</option>
                                            <option value="217">217</option>
                                            <option value="218">218</option>
                                            <option value="219">219</option>
                                            <option value="220">220</option>
                                            <option value="221">221</option>
                                            <option value="222">222</option>
                                            <option value="223">223</option>
                                            <option value="224">224</option>
                                            <option value="225">225</option>
                                            <option value="226">226</option>
                                            <option value="227">227</option>
                                            <option value="228">228</option>
                                            <option value="229">229</option>
                                            <option value="230">230</option>
                                            <option value="231">231</option>
                                            <option value="232">232</option>
                                            <option value="233">233</option>
                                            <option value="234">234</option>
                                            <option value="235">235</option>
                                            <option value="236">236</option>
                                            <option value="237">237</option>
                                            <option value="238">238</option>
                                            <option value="239">239</option>
                                            <option value="240">240</option>
                                            <option value="241">241</option>
                                            <option value="242">242</option>
                                            <option value="243">243</option>
                                            <option value="244">244</option>
                                            <option value="245">245</option>
                                            <option value="246">246</option>
                                            <option value="247">247</option>
                                            <option value="248">248</option>
                                            <option value="249">249</option>
                                            <option value="250">250</option>
                                            <option value="251">251</option>
                                            <option value="252">252</option>
                                            <option value="253">253</option>
                                            <option value="254">254</option>
                                            <option value="255">255</option>
                                            <option value="256">256</option>
                                            <option value="257">257</option>
                                            <option value="258">258</option>
                                            <option value="259">259</option>
                                            <option value="260">260</option>
                                            <option value="261">261</option>
                                            <option value="262">262</option>
                                            <option value="263">263</option>
                                            <option value="264">264</option>
                                            <option value="265">265</option>
                                            <option value="266">266</option>
                                            <option value="267">267</option>
                                            <option value="268">268</option>
                                            <option value="269">269</option>
                                            <option value="270">270</option>
                                            <option value="271">271</option>
                                            <option value="272">272</option>
                                            <option value="273">273</option>
                                            <option value="274">274</option>
                                            <option value="275">275</option>
                                            <option value="276">276</option>
                                            <option value="277">277</option>
                                            <option value="278">278</option>
                                            <option value="279">279</option>
                                            <option value="280">280</option>
                                            <option value="281">281</option>
                                            <option value="282">282</option>
                                            <option value="283">283</option>
                                            <option value="284">284</option>
                                            <option value="285">285</option>
                                            <option value="286">286</option>
                                            <option value="287">287</option>
                                            <option value="288">288</option>
                                            <option value="289">289</option>
                                            <option value="290">290</option>
                                            <option value="291">291</option>
                                            <option value="292">292</option>
                                            <option value="293">293</option>
                                            <option value="294">294</option>
                                            <option value="295">295</option>
                                            <option value="296">296</option>
                                            <option value="297">297</option>
                                            <option value="298">298</option>
                                            <option value="299">299</option>
                                            <option value="300">300</option>
                                            <option value="301">301</option>
                                            <option value="302">302</option>
                                            <option value="303">303</option>
                                            <option value="304">304</option>
                                            <option value="305">305</option>
                                            <option value="306">306</option>
                                            <option value="307">307</option>
                                            <option value="308">308</option>
                                            <option value="309">309</option>
                                            <option value="310">310</option>
                                            <option value="311">311</option>
                                            <option value="312">312</option>
                                            <option value="313">313</option>
                                            <option value="314">314</option>
                                            <option value="315">315</option>
                                            <option value="316">316</option>
                                            <option value="317">317</option>
                                            <option value="318">318</option>
                                            <option value="319">319</option>
                                            <option value="320">320</option>
                                            <option value="321">321</option>
                                            <option value="322">322</option>
                                            <option value="323">323</option>
                                            <option value="324">324</option>
                                            <option value="325">325</option>
                                            <option value="326">326</option>
                                            <option value="327">327</option>
                                            <option value="328">328</option>
                                            <option value="329">329</option>
                                            <option value="330">330</option>
                                            <option value="331">331</option>
                                            <option value="332">332</option>
                                            <option value="333">333</option>
                                            <option value="334">334</option>
                                            <option value="335">335</option>
                                            <option value="336">336</option>
                                            <option value="337">337</option>
                                            <option value="338">338</option>
                                            <option value="339">339</option>
                                            <option value="340">340</option>
                                            <option value="341">341</option>
                                            <option value="342">342</option>
                                            <option value="343">343</option>
                                            <option value="344">344</option>
                                            <option value="345">345</option>
                                            <option value="346">346</option>
                                            <option value="347">347</option>
                                            <option value="348">348</option>
                                            <option value="349">349</option>
                                            <option value="350">350</option>
                                            <option value="351">351</option>
                                            <option value="352">352</option>
                                            <option value="353">353</option>
                                            <option value="354">354</option>
                                            <option value="355">355</option>
                                            <option value="356">356</option>
                                            <option value="357">357</option>
                                            <option value="358">358</option>
                                            <option value="359">359</option>
                                            <option value="360">360</option>
                                            <option value="361">361</option>
                                            <option value="362">362</option>
                                            <option value="363">363</option>
                                            <option value="364">364</option>
                                            <option value="365">365</option>
                                            <option value="366">366</option>
                                            <option value="367">367</option>
                                            <option value="368">368</option>
                                            <option value="369">369</option>
                                            <option value="370">370</option>
                                            <option value="371">371</option>
                                            <option value="372">372</option>
                                            <option value="373">373</option>
                                            <option value="374">374</option>
                                            <option value="375">375</option>
                                            <option value="376">376</option>
                                            <option value="377">377</option>
                                            <option value="378">378</option>
                                            <option value="379">379</option>
                                            <option value="380">380</option>
                                            <option value="381">381</option>
                                            <option value="382">382</option>
                                            <option value="383">383</option>
                                            <option value="384">384</option>
                                            <option value="385">385</option>
                                            <option value="386">386</option>
                                            <option value="387">387</option>
                                            <option value="388">388</option>
                                            <option value="389">389</option>
                                            <option value="390">390</option>
                                            <option value="391">391</option>
                                            <option value="392">392</option>
                                            <option value="393">393</option>
                                            <option value="394">394</option>
                                            <option value="395">395</option>
                                            <option value="396">396</option>
                                            <option value="397">397</option>
                                            <option value="398">398</option>
                                            <option value="399">399</option>
                                            <option value="400">400</option>
                                            <option value="401">401</option>
                                            <option value="402">402</option>
                                            <option value="403">403</option>
                                            <option value="404">404</option>
                                            <option value="405">405</option>
                                            <option value="406">406</option>
                                            <option value="407">407</option>
                                            <option value="408">408</option>
                                            <option value="409">409</option>
                                            <option value="410">410</option>
                                            <option value="411">411</option>
                                            <option value="412">412</option>
                                            <option value="413">413</option>
                                            <option value="414">414</option>
                                            <option value="415">415</option>
                                            <option value="416">416</option>
                                            <option value="417">417</option>
                                            <option value="418">418</option>
                                            <option value="419">419</option>
                                            <option value="420">420</option>
                                            <option value="421">421</option>
                                            <option value="422">422</option>
                                            <option value="423">423</option>
                                            <option value="424">424</option>
                                            <option value="425">425</option>
                                            <option value="426">426</option>
                                            <option value="427">427</option>
                                            <option value="428">428</option>
                                            <option value="429">429</option>
                                            <option value="430">430</option>
                                            <option value="431">431</option>
                                            <option value="432">432</option>
                                            <option value="433">433</option>
                                            <option value="434">434</option>
                                            <option value="435">435</option>
                                            <option value="436">436</option>
                                            <option value="437">437</option>
                                            <option value="438">438</option>
                                            <option value="439">439</option>
                                            <option value="440">440</option>
                                            <option value="441">441</option>
                                            <option value="442">442</option>
                                            <option value="443">443</option>
                                            <option value="444">444</option>
                                            <option value="445">445</option>
                                            <option value="446">446</option>
                                            <option value="447">447</option>
                                            <option value="448">448</option>
                                            <option value="449">449</option>
                                            <option value="450">450</option>
                                            <option value="451">451</option>
                                            <option value="452">452</option>
                                            <option value="453">453</option>
                                            <option value="454">454</option>
                                            <option value="455">455</option>
                                            <option value="456">456</option>
                                            <option value="457">457</option>
                                            <option value="458">458</option>
                                            <option value="459">459</option>
                                            <option value="460">460</option>
                                            <option value="461">461</option>
                                            <option value="462">462</option>
                                            <option value="463">463</option>
                                            <option value="464">464</option>
                                            <option value="465">465</option>
                                            <option value="466">466</option>
                                            <option value="467">467</option>
                                            <option value="468">468</option>
                                            <option value="469">469</option>
                                            <option value="470">470</option>
                                            <option value="471">471</option>
                                            <option value="472">472</option>
                                            <option value="473">473</option>
                                            <option value="474">474</option>
                                            <option value="475">475</option>
                                            <option value="476">476</option>
                                            <option value="477">477</option>
                                            <option value="478">478</option>
                                            <option value="479">479</option>
                                            <option value="480">480</option>
                                            <option value="481">481</option>
                                            <option value="482">482</option>
                                            <option value="483">483</option>
                                            <option value="484">484</option>
                                            <option value="485">485</option>
                                            <option value="486">486</option>
                                            <option value="487">487</option>
                                            <option value="488">488</option>
                                            <option value="489">489</option>
                                            <option value="490">490</option>
                                            <option value="491">491</option>
                                            <option value="492">492</option>
                                            <option value="493">493</option>
                                            <option value="494">494</option>
                                            <option value="495">495</option>
                                            <option value="496">496</option>
                                            <option value="497">497</option>
                                            <option value="498">498</option>
                                            <option value="499">499</option>
                                            <option value="500">500</option>
                                            <option value="501">501</option>
                                            <option value="502">502</option>
                                            <option value="503">503</option>
                                            <option value="504">504</option>
                                            <option value="505">505</option>
                                            <option value="506">506</option>
                                            <option value="507">507</option>
                                            <option value="508">508</option>
                                            <option value="509">509</option>
                                            <option value="510">510</option>
                                            <option value="511">511</option>
                                            <option value="512">512</option>
                                            <option value="513">513</option>
                                            <option value="514">514</option>
                                            <option value="515">515</option>
                                            <option value="516">516</option>
                                            <option value="517">517</option>
                                            <option value="518">518</option>
                                            <option value="519">519</option>
                                            <option value="520">520</option>
                                            <option value="521">521</option>
                                            <option value="522">522</option>
                                            <option value="523">523</option>
                                            <option value="524">524</option>
                                            <option value="525">525</option>
                                            <option value="526">526</option>
                                            <option value="527">527</option>
                                            <option value="528">528</option>
                                            <option value="529">529</option>
                                            <option value="530">530</option>
                                            <option value="531">531</option>
                                            <option value="532">532</option>
                                            <option value="533">533</option>
                                            <option value="534">534</option>
                                            <option value="535">535</option>
                                            <option value="536">536</option>
                                            <option value="537">537</option>
                                            <option value="538">538</option>
                                            <option value="539">539</option>
                                            <option value="540">540</option>
                                            <option value="541">541</option>
                                            <option value="542">542</option>
                                            <option value="543">543</option>
                                            <option value="544">544</option>
                                            <option value="545">545</option>
                                            <option value="546">546</option>
                                            <option value="547">547</option>
                                            <option value="548">548</option>
                                            <option value="549">549</option>
                                            <option value="550">550</option>
                                            <option value="551">551</option>
                                            <option value="552">552</option>
                                            <option value="553">553</option>
                                            <option value="554">554</option>
                                            <option value="555">555</option>
                                            <option value="556">556</option>
                                            <option value="557">557</option>
                                            <option value="558">558</option>
                                            <option value="559">559</option>
                                            <option value="560">560</option>
                                            <option value="561">561</option>
                                            <option value="562">562</option>
                                            <option value="563">563</option>
                                            <option value="564">564</option>
                                            <option value="565">565</option>
                                            <option value="566">566</option>
                                            <option value="567">567</option>
                                            <option value="568">568</option>
                                            <option value="569">569</option>
                                            <option value="570">570</option>
                                            <option value="571">571</option>
                                            <option value="572">572</option>
                                            <option value="573">573</option>
                                            <option value="574">574</option>
                                            <option value="575">575</option>
                                            <option value="576">576</option>
                                            <option value="577">577</option>
                                            <option value="578">578</option>
                                            <option value="579">579</option>
                                            <option value="580">580</option>
                                            <option value="581">581</option>
                                            <option value="582">582</option>
                                            <option value="583">583</option>
                                            <option value="584">584</option>
                                            <option value="585">585</option>
                                            <option value="586">586</option>
                                            <option value="587">587</option>
                                            <option value="588">588</option>
                                            <option value="589">589</option>
                                            <option value="590">590</option>
                                            <option value="591">591</option>
                                            <option value="592">592</option>
                                            <option value="593">593</option>
                                            <option value="594">594</option>
                                            <option value="595">595</option>
                                            <option value="596">596</option>
                                            <option value="597">597</option>
                                            <option value="598">598</option>
                                            <option value="599">599</option>
                                            <option value="600">600</option>
                                            <option value="601">601</option>
                                            <option value="602">602</option>
                                            <option value="603">603</option>
                                            <option value="604">604</option>
                                            <option value="605">605</option>
                                            <option value="606">606</option>
                                            <option value="607">607</option>
                                            <option value="608">608</option>
                                            <option value="609">609</option>
                                            <option value="610">610</option>
                                            <option value="611">611</option>
                                            <option value="612">612</option>
                                            <option value="613">613</option>
                                            <option value="614">614</option>
                                            <option value="615">615</option>
                                            <option value="616">616</option>
                                            <option value="617">617</option>
                                            <option value="618">618</option>
                                            <option value="619">619</option>
                                            <option value="620">620</option>
                                            <option value="621">621</option>
                                            <option value="622">622</option>
                                            <option value="623">623</option>
                                            <option value="624">624</option>
                                            <option value="625">625</option>
                                            <option value="626">626</option>
                                            <option value="627">627</option>
                                            <option value="628">628</option>
                                            <option value="629">629</option>
                                            <option value="630">630</option>
                                            <option value="631">631</option>
                                            <option value="632">632</option>
                                            <option value="633">633</option>
                                            <option value="634">634</option>
                                            <option value="635">635</option>
                                            <option value="636">636</option>
                                            <option value="637">637</option>
                                            <option value="638">638</option>
                                            <option value="639">639</option>
                                            <option value="640">640</option>
                                            <option value="641">641</option>
                                            <option value="642">642</option>
                                            <option value="643">643</option>
                                            <option value="644">644</option>
                                            <option value="645">645</option>
                                            <option value="646">646</option>
                                            <option value="647">647</option>
                                            <option value="648">648</option>
                                            <option value="649">649</option>
                                            <option value="650">650</option>
                                            <option value="651">651</option>
                                            <option value="652">652</option>
                                            <option value="653">653</option>
                                            <option value="654">654</option>
                                            <option value="655">655</option>
                                            <option value="656">656</option>
                                            <option value="657">657</option>
                                            <option value="658">658</option>
                                            <option value="659">659</option>
                                            <option value="660">660</option>
                                            <option value="661">661</option>
                                            <option value="662">662</option>
                                            <option value="663">663</option>
                                            <option value="664">664</option>
                                            <option value="665">665</option>
                                            <option value="666">666</option>
                                            <option value="667">667</option>
                                            <option value="668">668</option>
                                            <option value="669">669</option>
                                            <option value="670">670</option>
                                            <option value="671">671</option>
                                            <option value="672">672</option>
                                            <option value="673">673</option>
                                            <option value="674">674</option>
                                            <option value="675">675</option>
                                            <option value="676">676</option>
                                            <option value="677">677</option>
                                            <option value="678">678</option>
                                            <option value="679">679</option>
                                            <option value="680">680</option>
                                            <option value="681">681</option>
                                            <option value="682">682</option>
                                            <option value="683">683</option>
                                            <option value="684">684</option>
                                            <option value="685">685</option>
                                            <option value="686">686</option>
                                            <option value="687">687</option>
                                            <option value="688">688</option>
                                            <option value="689">689</option>
                                            <option value="690">690</option>
                                            <option value="691">691</option>
                                            <option value="692">692</option>
                                            <option value="693">693</option>
                                            <option value="694">694</option>
                                            <option value="695">695</option>
                                            <option value="696">696</option>
                                            <option value="697">697</option>
                                            <option value="698">698</option>
                                            <option value="699">699</option>
                                            <option value="700">700</option>
                                            <option value="701">701</option>
                                            <option value="702">702</option>
                                            <option value="703">703</option>
                                            <option value="704">704</option>
                                            <option value="705">705</option>
                                            <option value="706">706</option>
                                            <option value="707">707</option>
                                            <option value="708">708</option>
                                            <option value="709">709</option>
                                            <option value="710">710</option>
                                            <option value="711">711</option>
                                            <option value="712">712</option>
                                            <option value="713">713</option>
                                            <option value="714">714</option>
                                            <option value="715">715</option>
                                            <option value="716">716</option>
                                            <option value="717">717</option>
                                            <option value="718">718</option>
                                            <option value="719">719</option>
                                            <option value="720">720</option>
                                            <option value="721">721</option>
                                            <option value="722">722</option>
                                            <option value="723">723</option>
                                            <option value="724">724</option>
                                            <option value="725">725</option>
                                            <option value="726">726</option>
                                            <option value="727">727</option>
                                            <option value="728">728</option>
                                            <option value="729">729</option>
                                            <option value="730">730</option>
                                            <option value="731">731</option>
                                            <option value="732">732</option>
                                            <option value="733">733</option>
                                            <option value="734">734</option>
                                            <option value="735">735</option>
                                            <option value="736">736</option>
                                            <option value="737">737</option>
                                            <option value="738">738</option>
                                            <option value="739">739</option>
                                            <option value="740">740</option>
                                            <option value="741">741</option>
                                            <option value="742">742</option>
                                            <option value="743">743</option>
                                            <option value="744">744</option>
                                            <option value="745">745</option>
                                            <option value="746">746</option>
                                            <option value="747">747</option>
                                            <option value="748">748</option>
                                            <option value="749">749</option>
                                            <option value="750">750</option>
                                            <option value="751">751</option>
                                            <option value="752">752</option>
                                            <option value="753">753</option>
                                            <option value="754">754</option>
                                            <option value="755">755</option>
                                            <option value="756">756</option>
                                            <option value="757">757</option>
                                            <option value="758">758</option>
                                            <option value="759">759</option>
                                            <option value="760">760</option>
                                            <option value="761">761</option>
                                            <option value="762">762</option>
                                            <option value="763">763</option>
                                            <option value="764">764</option>
                                            <option value="765">765</option>
                                            <option value="766">766</option>
                                            <option value="767">767</option>
                                            <option value="768">768</option>
                                            <option value="769">769</option>
                                            <option value="770">770</option>
                                            <option value="771">771</option>
                                            <option value="772">772</option>
                                            <option value="773">773</option>
                                            <option value="774">774</option>
                                            <option value="775">775</option>
                                            <option value="776">776</option>
                                            <option value="777">777</option>
                                            <option value="778">778</option>
                                            <option value="779">779</option>
                                            <option value="780">780</option>
                                            <option value="781">781</option>
                                            <option value="782">782</option>
                                            <option value="783">783</option>
                                            <option value="784">784</option>
                                            <option value="785">785</option>
                                            <option value="786">786</option>
                                            <option value="787">787</option>
                                            <option value="788">788</option>
                                            <option value="789">789</option>
                                            <option value="790">790</option>
                                            <option value="791">791</option>
                                            <option value="792">792</option>
                                            <option value="793">793</option>
                                            <option value="794">794</option>
                                            <option value="795">795</option>
                                            <option value="796">796</option>
                                            <option value="797">797</option>
                                            <option value="798">798</option>
                                            <option value="799">799</option>
                                            <option value="800">800</option>
                                            <option value="801">801</option>
                                            <option value="802">802</option>
                                            <option value="803">803</option>
                                            <option value="804">804</option>
                                            <option value="805">805</option>
                                            <option value="806">806</option>
                                            <option value="807">807</option>
                                            <option value="808">808</option>
                                            <option value="809">809</option>
                                            <option value="810">810</option>
                                            <option value="811">811</option>
                                            <option value="812">812</option>
                                            <option value="813">813</option>
                                            <option value="814">814</option>
                                            <option value="815">815</option>
                                            <option value="816">816</option>
                                            <option value="817">817</option>
                                            <option value="818">818</option>
                                            <option value="819">819</option>
                                            <option value="820">820</option>
                                            <option value="821">821</option>
                                            <option value="822">822</option>
                                            <option value="823">823</option>
                                            <option value="824">824</option>
                                            <option value="825">825</option>
                                            <option value="826">826</option>
                                            <option value="827">827</option>
                                            <option value="828">828</option>
                                            <option value="829">829</option>
                                            <option value="830">830</option>
                                            <option value="831">831</option>
                                            <option value="832">832</option>
                                            <option value="833">833</option>
                                            <option value="834">834</option>
                                            <option value="835">835</option>
                                            <option value="836">836</option>
                                            <option value="837">837</option>
                                            <option value="838">838</option>
                                            <option value="839">839</option>
                                            <option value="840">840</option>
                                            <option value="841">841</option>
                                            <option value="842">842</option>
                                            <option value="843">843</option>
                                            <option value="844">844</option>
                                            <option value="845">845</option>
                                            <option value="846">846</option>
                                            <option value="847">847</option>
                                            <option value="848">848</option>
                                            <option value="849">849</option>
                                            <option value="850">850</option>
                                            <option value="851">851</option>
                                            <option value="852">852</option>
                                            <option value="853">853</option>
                                            <option value="854">854</option>
                                            <option value="855">855</option>
                                            <option value="856">856</option>
                                            <option value="857">857</option>
                                            <option value="858">858</option>
                                            <option value="859">859</option>
                                            <option value="860">860</option>
                                            <option value="861">861</option>
                                            <option value="862">862</option>
                                            <option value="863">863</option>
                                            <option value="864">864</option>
                                            <option value="865">865</option>
                                            <option value="866">866</option>
                                            <option value="867">867</option>
                                            <option value="868">868</option>
                                            <option value="869">869</option>
                                            <option value="870">870</option>
                                            <option value="871">871</option>
                                            <option value="872">872</option>
                                            <option value="873">873</option>
                                            <option value="874">874</option>
                                            <option value="875">875</option>
                                            <option value="876">876</option>
                                            <option value="877">877</option>
                                            <option value="878">878</option>
                                            <option value="879">879</option>
                                            <option value="880">880</option>
                                            <option value="881">881</option>
                                            <option value="882">882</option>
                                            <option value="883">883</option>
                                            <option value="884">884</option>
                                            <option value="885">885</option>
                                            <option value="886">886</option>
                                            <option value="887">887</option>
                                            <option value="888">888</option>
                                            <option value="889">889</option>
                                            <option value="890">890</option>
                                            <option value="891">891</option>
                                            <option value="892">892</option>
                                            <option value="893">893</option>
                                            <option value="894">894</option>
                                            <option value="895">895</option>
                                            <option value="896">896</option>
                                            <option value="897">897</option>
                                            <option value="898">898</option>
                                            <option value="899">899</option>
                                            <option value="900">900</option>
                                            <option value="901">901</option>
                                            <option value="902">902</option>
                                            <option value="903">903</option>
                                            <option value="904">904</option>
                                            <option value="905">905</option>
                                            <option value="906">906</option>
                                            <option value="907">907</option>
                                            <option value="908">908</option>
                                            <option value="909">909</option>
                                            <option value="910">910</option>
                                            <option value="911">911</option>
                                            <option value="912">912</option>
                                            <option value="913">913</option>
                                            <option value="914">914</option>
                                            <option value="915">915</option>
                                            <option value="916">916</option>
                                            <option value="917">917</option>
                                            <option value="918">918</option>
                                            <option value="919">919</option>
                                            <option value="920">920</option>
                                            <option value="921">921</option>
                                            <option value="922">922</option>
                                            <option value="923">923</option>
                                            <option value="924">924</option>
                                            <option value="925">925</option>
                                            <option value="926">926</option>
                                            <option value="927">927</option>
                                            <option value="928">928</option>
                                            <option value="929">929</option>
                                            <option value="930">930</option>
                                            <option value="931">931</option>
                                            <option value="932">932</option>
                                            <option value="933">933</option>
                                            <option value="934">934</option>
                                            <option value="935">935</option>
                                            <option value="936">936</option>
                                            <option value="937">937</option>
                                            <option value="938">938</option>
                                            <option value="939">939</option>
                                            <option value="940">940</option>
                                            <option value="941">941</option>
                                            <option value="942">942</option>
                                            <option value="943">943</option>
                                            <option value="944">944</option>
                                            <option value="945">945</option>
                                            <option value="946">946</option>
                                            <option value="947">947</option>
                                            <option value="948">948</option>
                                            <option value="949">949</option>
                                            <option value="950">950</option>
                                            <option value="951">951</option>
                                            <option value="952">952</option>
                                            <option value="953">953</option>
                                            <option value="954">954</option>
                                            <option value="955">955</option>
                                            <option value="956">956</option>
                                            <option value="957">957</option>
                                            <option value="958">958</option>
                                            <option value="959">959</option>
                                            <option value="960">960</option>
                                            <option value="961">961</option>
                                            <option value="962">962</option>
                                            <option value="963">963</option>
                                            <option value="964">964</option>
                                            <option value="965">965</option>
                                            <option value="966">966</option>
                                            <option value="967">967</option>
                                            <option value="968">968</option>
                                            <option value="969">969</option>
                                            <option value="970">970</option>
                                            <option value="971">971</option>
                                            <option value="972">972</option>
                                            <option value="973">973</option>
                                            <option value="974">974</option>
                                            <option value="975">975</option>
                                            <option value="976">976</option>
                                            <option value="977">977</option>
                                            <option value="978">978</option>
                                            <option value="979">979</option>
                                            <option value="980">980</option>
                                            <option value="981">981</option>
                                            <option value="982">982</option>
                                            <option value="983">983</option>
                                            <option value="984">984</option>
                                            <option value="985">985</option>
                                            <option value="986">986</option>
                                            <option value="987">987</option>
                                            <option value="988">988</option>
                                            <option value="989">989</option>
                                            <option value="990">990</option>
                                            <option value="991">991</option>
                                            <option value="992">992</option>
                                            <option value="993">993</option>
                                            <option value="994">994</option>
                                            <option value="995">995</option>
                                            <option value="996">996</option>
                                            <option value="997">997</option>
                                            <option value="998">998</option>
                                            <option value="999">999</option>
                                            <option value="1000">1000</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col grow'>
                                        <span className='text-xs font-semibold text-center mb-1 text-gray-400 pr-3'>SAAT</span>
                                        <select name="hour" className='bg-gray-500 rounded p-1 px-2 text-center'>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col grow'>
                                        <span className='text-xs font-semibold text-center mb-1 text-gray-400 pr-3'>DAKİKA</span>
                                        <select name="minute" className='bg-gray-500 rounded p-1 px-2 text-center'>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>
                                </div>
                                <ul className="flex gap-6 my-2">
                                    <li className='grow'>
                                        <input type="radio" id="back" name="nextBack" value="-" className="hidden peer" required />
                                        <label htmlFor="back" className="flex items-center justify-center border p-2 text-sm font-bold rounded-lg border-gray-700 bg-gray-900 text-gray-600 peer-checked:bg-rose-700 peer-checked:text-gray-100">
                                            <span>GERİ</span>
                                        </label>
                                    </li>
                                    <li className='grow'>
                                        <input type="radio" id="current" name="nextBack" value="0" className="hidden peer" defaultChecked required />
                                        <label htmlFor="current" className="flex items-center justify-center border p-2 text-sm font-bold rounded-lg border-gray-700 bg-gray-900 text-gray-600 peer-checked:bg-rose-700 peer-checked:text-gray-100">
                                            <span>GÜNCEL</span>
                                        </label>
                                    </li>
                                    <li className='grow'>
                                        <input type="radio" id="next" name="nextBack" value="+" className="hidden peer" required />
                                        <label htmlFor="next" className="flex items-center justify-center border p-2 text-sm font-bold rounded-lg border-gray-700 bg-gray-900 text-gray-600 peer-checked:bg-rose-700 peer-checked:text-gray-100">
                                            <span>İLERİ</span>
                                        </label>
                                    </li>
                                </ul>
                                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700">Kamera Ekle</button>
                            </form>
                        )
                        : (
                            <button type="button" onClick={() => setAddForm(true)} className="text-white w-full mb-5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Yeni Kamera Ekle</button>
                        )
                }

                {
                    cameras.length > 1 && (
                        <ul className='flex flex-col gap-8'>
                            <li>
                                <div className='flex'>
                                    <span className='bg-amber-500 p-1 px-2 text-sm font-semibold rounded-t-md'>{cameras[0].label}</span>
                                </div>
                                <input type="datetime-local" className='rounded-md rounded-tl-none px-2 border border-amber-500 bg-amber-600 p-1 font-semibold w-full' value={cameras[0].dateUTC} onChange={(e) => _handleInput('current', e, 0)} />
                            </li>
                            {
                                cameras.map((item, index) => index > 0 && (
                                    <li key={index}>
                                        <div className='flex items-center gap-3'>
                                            <span className='bg-gray-500 p-1 px-2 text-sm font-semibold rounded-t-md'>{item.label === '' ? 'Kamera - ' + index : item.label}</span>
                                            <span className='text-sm text-gray-400'>{item.diffString.toLowerCase().replace(/(?<= )[^\s]|^./g, a => a.toUpperCase())}</span>
                                            <span className='ml-auto text-gray-500 px-3 cursor-pointer hover:text-red-700' onClick={() => _handleDelete(index)}><IoCloseSharp /></span>
                                        </div>
                                        <input type="datetime-local" className='rounded-md rounded-tl-none px-2 border border-gray-500 bg-gray-600 p-1 font-semibold w-full' value={item.dateUTC} onChange={(e) => _handleInput('camera', e, index)} />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </>
    )
}

export default PageCameraMatch