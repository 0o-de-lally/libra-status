<script lang="ts">
	import { mapHandles } from 'libra-reports/src/reports/whitepages';
	import type { ValidatorAccount } from 'libra-reports/src/types/system';

	export let v: ValidatorAccount;
</script>

<tr>
	<td>{v.handle}</td>
	<td>{v.address.slice(2, 6)}</td>
	<td>{v.bid_value}</td>
	<td>{v.qualification_errors}</td>
	<td>{mapHandles(v.active_vouchers ?? [])}</td>
	<td>{mapHandles(v.vouches_given?.addresses ?? [])}</td>
</tr>
