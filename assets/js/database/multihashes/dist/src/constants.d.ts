/**
 * Names for all available hashes
 */
export type HashName = "identity" | "sha1" | "sha2-256" | "sha2-512" | "sha3-512" | "sha3-384" | "sha3-256" | "sha3-224" | "shake-128" | "shake-256" | "keccak-224" | "keccak-256" | "keccak-384" | "keccak-512" | "blake3" | "murmur3-128" | "murmur3-32" | "dbl-sha2-256" | "md4" | "md5" | "bmt" | "sha2-256-trunc254-padded" | "ripemd-128" | "ripemd-160" | "ripemd-256" | "ripemd-320" | "x11" | "kangarootwelve" | "sm3-256" | "blake2b-8" | "blake2b-16" | "blake2b-24" | "blake2b-32" | "blake2b-40" | "blake2b-48" | "blake2b-56" | "blake2b-64" | "blake2b-72" | "blake2b-80" | "blake2b-88" | "blake2b-96" | "blake2b-104" | "blake2b-112" | "blake2b-120" | "blake2b-128" | "blake2b-136" | "blake2b-144" | "blake2b-152" | "blake2b-160" | "blake2b-168" | "blake2b-176" | "blake2b-184" | "blake2b-192" | "blake2b-200" | "blake2b-208" | "blake2b-216" | "blake2b-224" | "blake2b-232" | "blake2b-240" | "blake2b-248" | "blake2b-256" | "blake2b-264" | "blake2b-272" | "blake2b-280" | "blake2b-288" | "blake2b-296" | "blake2b-304" | "blake2b-312" | "blake2b-320" | "blake2b-328" | "blake2b-336" | "blake2b-344" | "blake2b-352" | "blake2b-360" | "blake2b-368" | "blake2b-376" | "blake2b-384" | "blake2b-392" | "blake2b-400" | "blake2b-408" | "blake2b-416" | "blake2b-424" | "blake2b-432" | "blake2b-440" | "blake2b-448" | "blake2b-456" | "blake2b-464" | "blake2b-472" | "blake2b-480" | "blake2b-488" | "blake2b-496" | "blake2b-504" | "blake2b-512" | "blake2s-8" | "blake2s-16" | "blake2s-24" | "blake2s-32" | "blake2s-40" | "blake2s-48" | "blake2s-56" | "blake2s-64" | "blake2s-72" | "blake2s-80" | "blake2s-88" | "blake2s-96" | "blake2s-104" | "blake2s-112" | "blake2s-120" | "blake2s-128" | "blake2s-136" | "blake2s-144" | "blake2s-152" | "blake2s-160" | "blake2s-168" | "blake2s-176" | "blake2s-184" | "blake2s-192" | "blake2s-200" | "blake2s-208" | "blake2s-216" | "blake2s-224" | "blake2s-232" | "blake2s-240" | "blake2s-248" | "blake2s-256" | "skein256-8" | "skein256-16" | "skein256-24" | "skein256-32" | "skein256-40" | "skein256-48" | "skein256-56" | "skein256-64" | "skein256-72" | "skein256-80" | "skein256-88" | "skein256-96" | "skein256-104" | "skein256-112" | "skein256-120" | "skein256-128" | "skein256-136" | "skein256-144" | "skein256-152" | "skein256-160" | "skein256-168" | "skein256-176" | "skein256-184" | "skein256-192" | "skein256-200" | "skein256-208" | "skein256-216" | "skein256-224" | "skein256-232" | "skein256-240" | "skein256-248" | "skein256-256" | "skein512-8" | "skein512-16" | "skein512-24" | "skein512-32" | "skein512-40" | "skein512-48" | "skein512-56" | "skein512-64" | "skein512-72" | "skein512-80" | "skein512-88" | "skein512-96" | "skein512-104" | "skein512-112" | "skein512-120" | "skein512-128" | "skein512-136" | "skein512-144" | "skein512-152" | "skein512-160" | "skein512-168" | "skein512-176" | "skein512-184" | "skein512-192" | "skein512-200" | "skein512-208" | "skein512-216" | "skein512-224" | "skein512-232" | "skein512-240" | "skein512-248" | "skein512-256" | "skein512-264" | "skein512-272" | "skein512-280" | "skein512-288" | "skein512-296" | "skein512-304" | "skein512-312" | "skein512-320" | "skein512-328" | "skein512-336" | "skein512-344" | "skein512-352" | "skein512-360" | "skein512-368" | "skein512-376" | "skein512-384" | "skein512-392" | "skein512-400" | "skein512-408" | "skein512-416" | "skein512-424" | "skein512-432" | "skein512-440" | "skein512-448" | "skein512-456" | "skein512-464" | "skein512-472" | "skein512-480" | "skein512-488" | "skein512-496" | "skein512-504" | "skein512-512" | "skein1024-8" | "skein1024-16" | "skein1024-24" | "skein1024-32" | "skein1024-40" | "skein1024-48" | "skein1024-56" | "skein1024-64" | "skein1024-72" | "skein1024-80" | "skein1024-88" | "skein1024-96" | "skein1024-104" | "skein1024-112" | "skein1024-120" | "skein1024-128" | "skein1024-136" | "skein1024-144" | "skein1024-152" | "skein1024-160" | "skein1024-168" | "skein1024-176" | "skein1024-184" | "skein1024-192" | "skein1024-200" | "skein1024-208" | "skein1024-216" | "skein1024-224" | "skein1024-232" | "skein1024-240" | "skein1024-248" | "skein1024-256" | "skein1024-264" | "skein1024-272" | "skein1024-280" | "skein1024-288" | "skein1024-296" | "skein1024-304" | "skein1024-312" | "skein1024-320" | "skein1024-328" | "skein1024-336" | "skein1024-344" | "skein1024-352" | "skein1024-360" | "skein1024-368" | "skein1024-376" | "skein1024-384" | "skein1024-392" | "skein1024-400" | "skein1024-408" | "skein1024-416" | "skein1024-424" | "skein1024-432" | "skein1024-440" | "skein1024-448" | "skein1024-456" | "skein1024-464" | "skein1024-472" | "skein1024-480" | "skein1024-488" | "skein1024-496" | "skein1024-504" | "skein1024-512" | "skein1024-520" | "skein1024-528" | "skein1024-536" | "skein1024-544" | "skein1024-552" | "skein1024-560" | "skein1024-568" | "skein1024-576" | "skein1024-584" | "skein1024-592" | "skein1024-600" | "skein1024-608" | "skein1024-616" | "skein1024-624" | "skein1024-632" | "skein1024-640" | "skein1024-648" | "skein1024-656" | "skein1024-664" | "skein1024-672" | "skein1024-680" | "skein1024-688" | "skein1024-696" | "skein1024-704" | "skein1024-712" | "skein1024-720" | "skein1024-728" | "skein1024-736" | "skein1024-744" | "skein1024-752" | "skein1024-760" | "skein1024-768" | "skein1024-776" | "skein1024-784" | "skein1024-792" | "skein1024-800" | "skein1024-808" | "skein1024-816" | "skein1024-824" | "skein1024-832" | "skein1024-840" | "skein1024-848" | "skein1024-856" | "skein1024-864" | "skein1024-872" | "skein1024-880" | "skein1024-888" | "skein1024-896" | "skein1024-904" | "skein1024-912" | "skein1024-920" | "skein1024-928" | "skein1024-936" | "skein1024-944" | "skein1024-952" | "skein1024-960" | "skein1024-968" | "skein1024-976" | "skein1024-984" | "skein1024-992" | "skein1024-1000" | "skein1024-1008" | "skein1024-1016" | "skein1024-1024" | "poseidon-bls12_381-a2-fc1" | "poseidon-bls12_381-a2-fc1-sc";
/**
 * Codes for all available hashes
 */
export type HashCode = 0 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 34 | 35 | 86 | 212 | 213 | 214 | 4114 | 4178 | 4179 | 4180 | 4181 | 4352 | 7425 | 21325 | 45569 | 45570 | 45571 | 45572 | 45573 | 45574 | 45575 | 45576 | 45577 | 45578 | 45579 | 45580 | 45581 | 45582 | 45583 | 45584 | 45585 | 45586 | 45587 | 45588 | 45589 | 45590 | 45591 | 45592 | 45593 | 45594 | 45595 | 45596 | 45597 | 45598 | 45599 | 45600 | 45601 | 45602 | 45603 | 45604 | 45605 | 45606 | 45607 | 45608 | 45609 | 45610 | 45611 | 45612 | 45613 | 45614 | 45615 | 45616 | 45617 | 45618 | 45619 | 45620 | 45621 | 45622 | 45623 | 45624 | 45625 | 45626 | 45627 | 45628 | 45629 | 45630 | 45631 | 45632 | 45633 | 45634 | 45635 | 45636 | 45637 | 45638 | 45639 | 45640 | 45641 | 45642 | 45643 | 45644 | 45645 | 45646 | 45647 | 45648 | 45649 | 45650 | 45651 | 45652 | 45653 | 45654 | 45655 | 45656 | 45657 | 45658 | 45659 | 45660 | 45661 | 45662 | 45663 | 45664 | 45825 | 45826 | 45827 | 45828 | 45829 | 45830 | 45831 | 45832 | 45833 | 45834 | 45835 | 45836 | 45837 | 45838 | 45839 | 45840 | 45841 | 45842 | 45843 | 45844 | 45845 | 45846 | 45847 | 45848 | 45849 | 45850 | 45851 | 45852 | 45853 | 45854 | 45855 | 45856 | 45857 | 45858 | 45859 | 45860 | 45861 | 45862 | 45863 | 45864 | 45865 | 45866 | 45867 | 45868 | 45869 | 45870 | 45871 | 45872 | 45873 | 45874 | 45875 | 45876 | 45877 | 45878 | 45879 | 45880 | 45881 | 45882 | 45883 | 45884 | 45885 | 45886 | 45887 | 45888 | 45889 | 45890 | 45891 | 45892 | 45893 | 45894 | 45895 | 45896 | 45897 | 45898 | 45899 | 45900 | 45901 | 45902 | 45903 | 45904 | 45905 | 45906 | 45907 | 45908 | 45909 | 45910 | 45911 | 45912 | 45913 | 45914 | 45915 | 45916 | 45917 | 45918 | 45919 | 45920 | 45921 | 45922 | 45923 | 45924 | 45925 | 45926 | 45927 | 45928 | 45929 | 45930 | 45931 | 45932 | 45933 | 45934 | 45935 | 45936 | 45937 | 45938 | 45939 | 45940 | 45941 | 45942 | 45943 | 45944 | 45945 | 45946 | 45947 | 45948 | 45949 | 45950 | 45951 | 45952 | 45953 | 45954 | 45955 | 45956 | 45957 | 45958 | 45959 | 45960 | 45961 | 45962 | 45963 | 45964 | 45965 | 45966 | 45967 | 45968 | 45969 | 45970 | 45971 | 45972 | 45973 | 45974 | 45975 | 45976 | 45977 | 45978 | 45979 | 45980 | 45981 | 45982 | 45983 | 45984 | 45985 | 45986 | 45987 | 45988 | 45989 | 45990 | 45991 | 45992 | 45993 | 45994 | 45995 | 45996 | 45997 | 45998 | 45999 | 46000 | 46001 | 46002 | 46003 | 46004 | 46005 | 46006 | 46007 | 46008 | 46009 | 46010 | 46011 | 46012 | 46013 | 46014 | 46015 | 46016 | 46017 | 46018 | 46019 | 46020 | 46021 | 46022 | 46023 | 46024 | 46025 | 46026 | 46027 | 46028 | 46029 | 46030 | 46031 | 46032 | 46033 | 46034 | 46035 | 46036 | 46037 | 46038 | 46039 | 46040 | 46041 | 46042 | 46043 | 46044 | 46045 | 46046 | 46047 | 46048 | 46081 | 46082;
/**
 * Names for all available hashes
 *
 * @typedef { "identity" | "sha1" | "sha2-256" | "sha2-512" | "sha3-512" | "sha3-384" | "sha3-256" | "sha3-224" | "shake-128" | "shake-256" | "keccak-224" | "keccak-256" | "keccak-384" | "keccak-512" | "blake3" | "murmur3-128" | "murmur3-32" | "dbl-sha2-256" | "md4" | "md5" | "bmt" | "sha2-256-trunc254-padded" | "ripemd-128" | "ripemd-160" | "ripemd-256" | "ripemd-320" | "x11" | "kangarootwelve" | "sm3-256" | "blake2b-8" | "blake2b-16" | "blake2b-24" | "blake2b-32" | "blake2b-40" | "blake2b-48" | "blake2b-56" | "blake2b-64" | "blake2b-72" | "blake2b-80" | "blake2b-88" | "blake2b-96" | "blake2b-104" | "blake2b-112" | "blake2b-120" | "blake2b-128" | "blake2b-136" | "blake2b-144" | "blake2b-152" | "blake2b-160" | "blake2b-168" | "blake2b-176" | "blake2b-184" | "blake2b-192" | "blake2b-200" | "blake2b-208" | "blake2b-216" | "blake2b-224" | "blake2b-232" | "blake2b-240" | "blake2b-248" | "blake2b-256" | "blake2b-264" | "blake2b-272" | "blake2b-280" | "blake2b-288" | "blake2b-296" | "blake2b-304" | "blake2b-312" | "blake2b-320" | "blake2b-328" | "blake2b-336" | "blake2b-344" | "blake2b-352" | "blake2b-360" | "blake2b-368" | "blake2b-376" | "blake2b-384" | "blake2b-392" | "blake2b-400" | "blake2b-408" | "blake2b-416" | "blake2b-424" | "blake2b-432" | "blake2b-440" | "blake2b-448" | "blake2b-456" | "blake2b-464" | "blake2b-472" | "blake2b-480" | "blake2b-488" | "blake2b-496" | "blake2b-504" | "blake2b-512" | "blake2s-8" | "blake2s-16" | "blake2s-24" | "blake2s-32" | "blake2s-40" | "blake2s-48" | "blake2s-56" | "blake2s-64" | "blake2s-72" | "blake2s-80" | "blake2s-88" | "blake2s-96" | "blake2s-104" | "blake2s-112" | "blake2s-120" | "blake2s-128" | "blake2s-136" | "blake2s-144" | "blake2s-152" | "blake2s-160" | "blake2s-168" | "blake2s-176" | "blake2s-184" | "blake2s-192" | "blake2s-200" | "blake2s-208" | "blake2s-216" | "blake2s-224" | "blake2s-232" | "blake2s-240" | "blake2s-248" | "blake2s-256" | "skein256-8" | "skein256-16" | "skein256-24" | "skein256-32" | "skein256-40" | "skein256-48" | "skein256-56" | "skein256-64" | "skein256-72" | "skein256-80" | "skein256-88" | "skein256-96" | "skein256-104" | "skein256-112" | "skein256-120" | "skein256-128" | "skein256-136" | "skein256-144" | "skein256-152" | "skein256-160" | "skein256-168" | "skein256-176" | "skein256-184" | "skein256-192" | "skein256-200" | "skein256-208" | "skein256-216" | "skein256-224" | "skein256-232" | "skein256-240" | "skein256-248" | "skein256-256" | "skein512-8" | "skein512-16" | "skein512-24" | "skein512-32" | "skein512-40" | "skein512-48" | "skein512-56" | "skein512-64" | "skein512-72" | "skein512-80" | "skein512-88" | "skein512-96" | "skein512-104" | "skein512-112" | "skein512-120" | "skein512-128" | "skein512-136" | "skein512-144" | "skein512-152" | "skein512-160" | "skein512-168" | "skein512-176" | "skein512-184" | "skein512-192" | "skein512-200" | "skein512-208" | "skein512-216" | "skein512-224" | "skein512-232" | "skein512-240" | "skein512-248" | "skein512-256" | "skein512-264" | "skein512-272" | "skein512-280" | "skein512-288" | "skein512-296" | "skein512-304" | "skein512-312" | "skein512-320" | "skein512-328" | "skein512-336" | "skein512-344" | "skein512-352" | "skein512-360" | "skein512-368" | "skein512-376" | "skein512-384" | "skein512-392" | "skein512-400" | "skein512-408" | "skein512-416" | "skein512-424" | "skein512-432" | "skein512-440" | "skein512-448" | "skein512-456" | "skein512-464" | "skein512-472" | "skein512-480" | "skein512-488" | "skein512-496" | "skein512-504" | "skein512-512" | "skein1024-8" | "skein1024-16" | "skein1024-24" | "skein1024-32" | "skein1024-40" | "skein1024-48" | "skein1024-56" | "skein1024-64" | "skein1024-72" | "skein1024-80" | "skein1024-88" | "skein1024-96" | "skein1024-104" | "skein1024-112" | "skein1024-120" | "skein1024-128" | "skein1024-136" | "skein1024-144" | "skein1024-152" | "skein1024-160" | "skein1024-168" | "skein1024-176" | "skein1024-184" | "skein1024-192" | "skein1024-200" | "skein1024-208" | "skein1024-216" | "skein1024-224" | "skein1024-232" | "skein1024-240" | "skein1024-248" | "skein1024-256" | "skein1024-264" | "skein1024-272" | "skein1024-280" | "skein1024-288" | "skein1024-296" | "skein1024-304" | "skein1024-312" | "skein1024-320" | "skein1024-328" | "skein1024-336" | "skein1024-344" | "skein1024-352" | "skein1024-360" | "skein1024-368" | "skein1024-376" | "skein1024-384" | "skein1024-392" | "skein1024-400" | "skein1024-408" | "skein1024-416" | "skein1024-424" | "skein1024-432" | "skein1024-440" | "skein1024-448" | "skein1024-456" | "skein1024-464" | "skein1024-472" | "skein1024-480" | "skein1024-488" | "skein1024-496" | "skein1024-504" | "skein1024-512" | "skein1024-520" | "skein1024-528" | "skein1024-536" | "skein1024-544" | "skein1024-552" | "skein1024-560" | "skein1024-568" | "skein1024-576" | "skein1024-584" | "skein1024-592" | "skein1024-600" | "skein1024-608" | "skein1024-616" | "skein1024-624" | "skein1024-632" | "skein1024-640" | "skein1024-648" | "skein1024-656" | "skein1024-664" | "skein1024-672" | "skein1024-680" | "skein1024-688" | "skein1024-696" | "skein1024-704" | "skein1024-712" | "skein1024-720" | "skein1024-728" | "skein1024-736" | "skein1024-744" | "skein1024-752" | "skein1024-760" | "skein1024-768" | "skein1024-776" | "skein1024-784" | "skein1024-792" | "skein1024-800" | "skein1024-808" | "skein1024-816" | "skein1024-824" | "skein1024-832" | "skein1024-840" | "skein1024-848" | "skein1024-856" | "skein1024-864" | "skein1024-872" | "skein1024-880" | "skein1024-888" | "skein1024-896" | "skein1024-904" | "skein1024-912" | "skein1024-920" | "skein1024-928" | "skein1024-936" | "skein1024-944" | "skein1024-952" | "skein1024-960" | "skein1024-968" | "skein1024-976" | "skein1024-984" | "skein1024-992" | "skein1024-1000" | "skein1024-1008" | "skein1024-1016" | "skein1024-1024" | "poseidon-bls12_381-a2-fc1" | "poseidon-bls12_381-a2-fc1-sc" } HashName
 */
/**
 * Codes for all available hashes
 *
 * @typedef { 0x00 | 0x11 | 0x12 | 0x13 | 0x14 | 0x15 | 0x16 | 0x17 | 0x18 | 0x19 | 0x1a | 0x1b | 0x1c | 0x1d | 0x1e | 0x22 | 0x23 | 0x56 | 0xd4 | 0xd5 | 0xd6 | 0x1012 | 0x1052 | 0x1053 | 0x1054 | 0x1055 | 0x1100 | 0x1d01 | 0x534d | 0xb201 | 0xb202 | 0xb203 | 0xb204 | 0xb205 | 0xb206 | 0xb207 | 0xb208 | 0xb209 | 0xb20a | 0xb20b | 0xb20c | 0xb20d | 0xb20e | 0xb20f | 0xb210 | 0xb211 | 0xb212 | 0xb213 | 0xb214 | 0xb215 | 0xb216 | 0xb217 | 0xb218 | 0xb219 | 0xb21a | 0xb21b | 0xb21c | 0xb21d | 0xb21e | 0xb21f | 0xb220 | 0xb221 | 0xb222 | 0xb223 | 0xb224 | 0xb225 | 0xb226 | 0xb227 | 0xb228 | 0xb229 | 0xb22a | 0xb22b | 0xb22c | 0xb22d | 0xb22e | 0xb22f | 0xb230 | 0xb231 | 0xb232 | 0xb233 | 0xb234 | 0xb235 | 0xb236 | 0xb237 | 0xb238 | 0xb239 | 0xb23a | 0xb23b | 0xb23c | 0xb23d | 0xb23e | 0xb23f | 0xb240 | 0xb241 | 0xb242 | 0xb243 | 0xb244 | 0xb245 | 0xb246 | 0xb247 | 0xb248 | 0xb249 | 0xb24a | 0xb24b | 0xb24c | 0xb24d | 0xb24e | 0xb24f | 0xb250 | 0xb251 | 0xb252 | 0xb253 | 0xb254 | 0xb255 | 0xb256 | 0xb257 | 0xb258 | 0xb259 | 0xb25a | 0xb25b | 0xb25c | 0xb25d | 0xb25e | 0xb25f | 0xb260 | 0xb301 | 0xb302 | 0xb303 | 0xb304 | 0xb305 | 0xb306 | 0xb307 | 0xb308 | 0xb309 | 0xb30a | 0xb30b | 0xb30c | 0xb30d | 0xb30e | 0xb30f | 0xb310 | 0xb311 | 0xb312 | 0xb313 | 0xb314 | 0xb315 | 0xb316 | 0xb317 | 0xb318 | 0xb319 | 0xb31a | 0xb31b | 0xb31c | 0xb31d | 0xb31e | 0xb31f | 0xb320 | 0xb321 | 0xb322 | 0xb323 | 0xb324 | 0xb325 | 0xb326 | 0xb327 | 0xb328 | 0xb329 | 0xb32a | 0xb32b | 0xb32c | 0xb32d | 0xb32e | 0xb32f | 0xb330 | 0xb331 | 0xb332 | 0xb333 | 0xb334 | 0xb335 | 0xb336 | 0xb337 | 0xb338 | 0xb339 | 0xb33a | 0xb33b | 0xb33c | 0xb33d | 0xb33e | 0xb33f | 0xb340 | 0xb341 | 0xb342 | 0xb343 | 0xb344 | 0xb345 | 0xb346 | 0xb347 | 0xb348 | 0xb349 | 0xb34a | 0xb34b | 0xb34c | 0xb34d | 0xb34e | 0xb34f | 0xb350 | 0xb351 | 0xb352 | 0xb353 | 0xb354 | 0xb355 | 0xb356 | 0xb357 | 0xb358 | 0xb359 | 0xb35a | 0xb35b | 0xb35c | 0xb35d | 0xb35e | 0xb35f | 0xb360 | 0xb361 | 0xb362 | 0xb363 | 0xb364 | 0xb365 | 0xb366 | 0xb367 | 0xb368 | 0xb369 | 0xb36a | 0xb36b | 0xb36c | 0xb36d | 0xb36e | 0xb36f | 0xb370 | 0xb371 | 0xb372 | 0xb373 | 0xb374 | 0xb375 | 0xb376 | 0xb377 | 0xb378 | 0xb379 | 0xb37a | 0xb37b | 0xb37c | 0xb37d | 0xb37e | 0xb37f | 0xb380 | 0xb381 | 0xb382 | 0xb383 | 0xb384 | 0xb385 | 0xb386 | 0xb387 | 0xb388 | 0xb389 | 0xb38a | 0xb38b | 0xb38c | 0xb38d | 0xb38e | 0xb38f | 0xb390 | 0xb391 | 0xb392 | 0xb393 | 0xb394 | 0xb395 | 0xb396 | 0xb397 | 0xb398 | 0xb399 | 0xb39a | 0xb39b | 0xb39c | 0xb39d | 0xb39e | 0xb39f | 0xb3a0 | 0xb3a1 | 0xb3a2 | 0xb3a3 | 0xb3a4 | 0xb3a5 | 0xb3a6 | 0xb3a7 | 0xb3a8 | 0xb3a9 | 0xb3aa | 0xb3ab | 0xb3ac | 0xb3ad | 0xb3ae | 0xb3af | 0xb3b0 | 0xb3b1 | 0xb3b2 | 0xb3b3 | 0xb3b4 | 0xb3b5 | 0xb3b6 | 0xb3b7 | 0xb3b8 | 0xb3b9 | 0xb3ba | 0xb3bb | 0xb3bc | 0xb3bd | 0xb3be | 0xb3bf | 0xb3c0 | 0xb3c1 | 0xb3c2 | 0xb3c3 | 0xb3c4 | 0xb3c5 | 0xb3c6 | 0xb3c7 | 0xb3c8 | 0xb3c9 | 0xb3ca | 0xb3cb | 0xb3cc | 0xb3cd | 0xb3ce | 0xb3cf | 0xb3d0 | 0xb3d1 | 0xb3d2 | 0xb3d3 | 0xb3d4 | 0xb3d5 | 0xb3d6 | 0xb3d7 | 0xb3d8 | 0xb3d9 | 0xb3da | 0xb3db | 0xb3dc | 0xb3dd | 0xb3de | 0xb3df | 0xb3e0 | 0xb401 | 0xb402 } HashCode
 */
/**
 * @type { Record<HashName,HashCode> }
 */
export const names: Record<HashName, HashCode>;
//# sourceMappingURL=constants.d.ts.map